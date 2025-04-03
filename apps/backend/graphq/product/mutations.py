import graphene
from graph.accounts.types import UserNode
from graph.product.types import CategoryNode, ProductNode
from graphene import relay
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_relay import from_global_id

from attribute.models.base import Attribute
from graphene_django_jwt.decorators import login_required
from product.models import Category
# Utility Functions
def validate_attributes_are_product_type(attributes, field_name):
    invalid_attributes = [
        graphene.Node.to_global_id("Attribute", attr.pk)
        for attr in attributes if attr.type != AttributeType.PRODUCT_TYPE
    ]
    if invalid_attributes:
        raise ValidationError({
            field_name: ValidationError(
                "Only product type attributes are allowed.",
                code=ProductErrorCode.INVALID.value,
                params={"attributes": invalid_attributes}
            )
        })

def delete_assigned_attribute_values(instance_id, is_product=True):
    """Delete assigned attribute values with unique input types."""
    filter_kwargs = {
        'attribute__input_type__in': AttributeInputType.TYPES_WITH_UNIQUE_VALUES
    }
    if is_product:
        filter_kwargs['productassignments__product_id'] = instance_id
    else:
        filter_kwargs.update({
            'productassignments__assignment__product_type_id': instance_id,
            'variantassignments__assignment__product_type_id': instance_id
        })
    AttributeValue.objects.filter(**filter_kwargs).delete()

def delete_draft_order_lines_for_variants(variants_ids):
    """Delete draft order lines associated with given variant IDs."""
    draft_order_lines = OrderLine.objects.filter(
        variant_id__in=variants_ids,
        order__status=OrderStatus.DRAFT
    )
    order_pks = draft_order_lines.values_list('order_id', flat=True)
    line_pks = draft_order_lines.values_list('pk', flat=True)
    draft_order_lines.delete()
    return order_pks, line_pks

def recalculate_orders_async(order_pks, context):
    if order_pks:
        recalculate_orders_task.delay(list(order_pks))
        manager = get_plugin_manager_promise(context).get()
        return manager


class SeoInput(graphene.InputObjectType):
    title = graphene.String(description="SEO title.")
    description = graphene.String(description="SEO description.")


class CategoryInput(InputObjectType):
    name = graphene.String(required=True)
    slug = graphene.String(required=False)
    description = graphene.JSONString()
    description_plaintext = graphene.String()
    seo = graphene.InputField(SeoInput)
    background_image_alt = graphene.String()
    metadata = graphene.JSONString()
    private_metadata = graphene.JSONString()
    parent_id = graphene.ID(required=False)

# Mutations
class CategoryCreate(relay.ClientIDMutation):
    class Input:
        input = CategoryInput(required=True)

    success = graphene.Boolean()
    category = graphene.Field(Category)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        parent = None
        parent_id = input.get("parent_id")
        if parent_id:
            parent = cls.get_node_or_error(info, parent_id, field="parent", only_type=Category)

        seo_data = input.pop("seo", {})
        category = Category(
            parent=parent,
            **input
        )
        if seo_data:
            category.seo_title = seo_data.get("title")
            category.seo_description = seo_data.get("description")

        background_image = info.context.FILES.get("background_image")
        if background_image:
            category.background_image = background_image

        category.save()

        metadata = input.get("metadata")
        private_metadata = input.get("private_metadata")
        if metadata:
            category.store_value_in_metadata(metadata)
        if private_metadata:
            category.store_value_in_private_metadata(private_metadata)

        return CategoryCreate(success=True, category=category)

class CategoryUpdate(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        input = CategoryInput(required=True)

    success = graphene.Boolean()
    category = graphene.Field(Category)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        category = cls.get_node_or_error(info, input.pop("id"), only_type=Category)

        parent_id = input.pop("parent_id", None)
        if parent_id:
            parent = cls.get_node_or_error(info, parent_id, only_type=Category)
            category.parent = parent

        seo_data = input.pop("seo", {})
        if seo_data:
            category.seo_title = seo_data.get("title")
            category.seo_description = seo_data.get("description")

        metadata = input.get("metadata")
        private_metadata = input.get("private_metadata")
        if metadata:
            category.store_value_in_metadata(metadata)
        if private_metadata:
            category.store_value_in_private_metadata(private_metadata)

        background_image = info.context.FILES.get("background_image")
        if background_image:
            if category.background_image:
                category.background_image.delete()
            category.background_image = background_image

        for attr, value in input.items():
            setattr(category, attr, value)

        category.save()

        return CategoryUpdate(success=True, category=category)

class CategoryDelete(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        category = cls.get_node_or_error(info, input.get("id"), only_type=Category)
        db_id = category.id
        delete_categories([db_id])
        return CategoryDelete(success=True)

class ProductInput(InputObjectType):
    name = graphene.String(required=True)
    slug = graphene.String(required=False)
    description = graphene.JSONString()
    description_plaintext = graphene.String()
    product_type = graphene.ID(required=True)
    category = graphene.ID(required=False)
    weight = graphene.Float(required=False)
    tax_class = graphene.ID(required=False)
    metadata = graphene.JSONString()
    private_metadata = graphene.JSONString()
    seo = graphene.InputField(SeoInput)

class ProductVariantInput(InputObjectType):
    sku = graphene.String(required=True)
    name = graphene.String(required=False)
    product = graphene.ID(required=True)
    weight = graphene.Float(required=False)
    track_inventory = graphene.Boolean(required=False)
    preorder = graphene.Boolean(required=False)
    quantity_limit_per_customer = graphene.Int(required=False)
    metadata = graphene.JSONString()
    private_metadata = graphene.JSONString()

class ProductMediaInput(InputObjectType):
    product = graphene.ID(required=True)
    image = graphene.String(required=False)
    alt = graphene.String(required=False)
    type = graphene.String(required=False)

class CollectionInput(InputObjectType):
    name = graphene.String(required=True)
    slug = graphene.String(required=False)
    description = graphene.JSONString()
    background_image_alt = graphene.String()
    seo = graphene.InputField(SeoInput)
    metadata = graphene.JSONString()
    private_metadata = graphene.JSONString()
    products = graphene.List(graphene.ID, required=False)

# Product Mutations
class ProductCreate(relay.ClientIDMutation):
    class Input:
        input = ProductInput(required=True)

    success = graphene.Boolean()
    product = graphene.Field(Product)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        product_type_id = input["product_type"]
        product_type = cls.get_node_or_error(info, product_type_id, only_type=ProductType)

        product = Product(
            name=input["name"],
            slug=input.get("slug", slugify(input["name"])),
            description=input.get("description"),
            product_type=product_type,
            weight=input.get("weight"),
        )

        if input.get("category"):
            category = cls.get_node_or_error(info, input["category"], only_type=Category)
            product.category = category

        product.save()

        if input.get("seo"):
            product.seo_title = input["seo"].get("title")
            product.seo_description = input["seo"].get("description")
            product.save()

        return ProductCreate(success=True, product=product)

class ProductUpdate(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        input = ProductInput(required=True)

    success = graphene.Boolean()
    product = graphene.Field(Product)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        product = cls.get_node_or_error(info, input["id"], only_type=Product)

        for field, value in input["input"].items():
            setattr(product, field, value)

        if input["input"].get("seo"):
            product.seo_title = input["input"]["seo"].get("title")
            product.seo_description = input["input"]["seo"].get("description")

        product.save()
        return ProductUpdate(success=True, product=product)

class ProductDelete(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        product = cls.get_node_or_error(info, input["id"], only_type=Product)
        product.delete()
        return ProductDelete(success=True)

# Product Variant Mutations
class ProductVariantCreate(relay.ClientIDMutation):
    class Input:
        input = ProductVariantInput(required=True)

    success = graphene.Boolean()
    variant = graphene.Field(ProductVariant)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        product_id = input["input"]["product"]
        product = cls.get_node_or_error(info, product_id, only_type=Product)

        variant = ProductVariant(
            sku=input["input"]["sku"],
            name=input["input"].get("name"),
            product=product,
            weight=input["input"].get("weight"),
            track_inventory=input["input"].get("track_inventory", True),
        )

        variant.save()
        return ProductVariantCreate(success=True, variant=variant)

class ProductVariantUpdate(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        input = ProductVariantInput(required=True)

    success = graphene.Boolean()
    variant = graphene.Field(ProductVariant)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        variant = cls.get_node_or_error(info, input["id"], only_type=ProductVariant)

        for field, value in input["input"].items():
            setattr(variant, field, value)

        variant.save()
        return ProductVariantUpdate(success=True, variant=variant)

class ProductVariantDelete(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        variant = cls.get_node_or_error(info, input["id"], only_type=ProductVariant)
        variant.delete()
        return ProductVariantDelete(success=True)
# Product Variant Mutations
class ProductVariantReorder(relay.ClientIDMutation):
    product = graphene.Field(Product)

    class Input:
        product_id = graphene.ID(
            required=True,
            description="ID of the product whose variants will be reordered.",
        )
        moves = NonNullList(
            ReorderInput,
            required=True,
            description="List of variant reordering operations.",
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        product_id = input.get("product_id")
        moves = input.get("moves")

        # Fetch product and variants
        product = cls.get_node_or_error(info, product_id, only_type=Product)
        variants = product.variants.all()

        # Validate and process moves
        operations = {}
        for move_info in moves:
            variant_id = move_info.product_id
            variant = cls.get_node_or_error(info, variant_id, only_type=ProductVariant)
            if variant.product != product:
                raise ValidationError({
                    "moves": ValidationError(
                        f"Variant {variant_id} does not belong to the product.",
                        code=ProductErrorCode.NOT_PRODUCTS_VARIANT.value,
                    )
                })
            operations[variant.pk] = move_info.sort_order

        # Perform reordering
        with transaction.atomic():
            perform_reordering(variants, operations)
            product.save(update_fields=["updated_at"])

        # Trigger product update event
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.product_updated, product)

        return ProductVariantReorder(
            product=ChannelContext(node=product, channel_slug=None)
        )


# Product Media Mutations
class ProductMediaCreate(relay.ClientIDMutation):
    class Input:
        input = ProductMediaInput(required=True)

    success = graphene.Boolean()
    media = graphene.Field(ProductMedia)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        product_id = input["input"]["product"]
        product = cls.get_node_or_error(info, product_id, only_type=Product)

        media = ProductMedia(
            product=product,
            image=input["input"].get("image"),
            alt=input["input"].get("alt"),
            type=input["input"].get("type", ProductMediaTypes.IMAGE),
        )

        media.save()
        return ProductMediaCreate(success=True, media=media)

class ProductMediaDelete(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        media = cls.get_node_or_error(info, input["id"], only_type=ProductMedia)
        media.delete()
        return ProductMediaDelete(success=True)

class ProductMediaUpdate(relay.ClientIDMutation):
    product = graphene.Field(Product)
    media = graphene.Field(ProductMedia)

    class Input:
        id = graphene.ID(required=True, description="ID of a product media to update.")
        input = ProductMediaUpdateInput(
            required=True, description="Fields required to update a product media."
        )

    

    @classmethod
    def mutate_and_get_payload(cls, root, info, id, **input):
        media = cls.get_node_or_error(info, id, only_type=ProductMedia)
        product = models.Product.objects.get(pk=media.product_id)
        alt = input.get("alt")
        if alt is not None:
            if len(alt) > ALT_CHAR_LIMIT:
                raise ValidationError(
                    {
                        "input": ValidationError(
                            f"Alt field exceeds the character "
                            f"limit of {ALT_CHAR_LIMIT}.",
                            code=ProductErrorCode.INVALID.value,
                        )
                    }
                )
            media.alt = alt
            media.save(update_fields=["alt"])
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.product_updated, product)
        cls.call_event(manager.product_media_updated, media)
        product = ChannelContext(node=product, channel_slug=None)
        return ProductMediaUpdate(product=product, media=media)
# Product Media Mutations
class ProductMediaReorder(relay.ClientIDMutation):
    product = graphene.Field(Product)
    media = NonNullList(ProductMedia)

    class Input:
        product_id = graphene.ID(required=True, description="ID of the product whose media order will be altered.")
        media_ids = NonNullList(graphene.ID, required=True, description="IDs of the product media in the desired order.")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        product_id = input.get("product_id")
        media_ids = input.get("media_ids")

        # Fetch product and media
        product = cls.get_node_or_error(
            info, product_id, field="product_id", only_type=Product
        )
        if len(media_ids) != product.media.count():
            raise ValidationError({
                "order": ValidationError(
                    "Incorrect number of media IDs provided.",
                    code=ProductErrorCode.INVALID.value,
                )
            })

        # Validate and order media
        ordered_media = []
        for media_id in media_ids:
            media = cls.get_node_or_error(info, media_id, field="order", only_type=ProductMedia)
            if media.product != product:
                raise ValidationError({
                    "order": ValidationError(
                        f"Media {media_id} does not belong to this product.",
                        code=ProductErrorCode.NOT_PRODUCTS_IMAGE.value,
                    )
                })
            ordered_media.append(media)

        # Update media order
        with transaction.atomic():
            update_ordered_media(ordered_media)

        # Trigger product update event
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.product_updated, product)

        return ProductMediaReorder(
            product=ChannelContext(node=product, channel_slug=None),
            media=ordered_media,
        )


# Collection Mutations
class CollectionCreate(relay.ClientIDMutation):
    class Input:
        input = CollectionInput(required=True)

    success = graphene.Boolean()
    collection = graphene.Field(Collection)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        collection = Collection(
            name=input["input"]["name"],
            slug=input.get("slug", slugify(input["input"]["name"])),
            description=input["input"].get("description"),
            background_image_alt=input["input"].get("background_image_alt"),
        )

        if input["input"].get("seo"):
            collection.seo_title = input["input"]["seo"].get("title")
            collection.seo_description = input["input"]["seo"].get("description")

        collection.save()

        if input["input"].get("products"):
            products = cls.get_nodes_or_error(info, input["input"]["products"], only_type=Product)
            collection.products.add(*products)

        return CollectionCreate(success=True, collection=collection)

class CollectionUpdate(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        input = CollectionInput(required=True)

    success = graphene.Boolean()
    collection = graphene.Field(Collection)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        collection = cls.get_node_or_error(info, input["id"], only_type=Collection)

        for field, value in input["input"].items():
            setattr(collection, field, value)

        if input["input"].get("seo"):
            collection.seo_title = input["input"]["seo"].get("title")
            collection.seo_description = input["input"]["seo"].get("description")

        collection.save()

        if input["input"].get("products"):
            products = cls.get_nodes_or_error(info, input["input"]["products"], only_type=Product)
            collection.products.set(products)

        return CollectionUpdate(success=True, collection=collection)

class CollectionDelete(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        collection = cls.get_node_or_error(info, input["id"], only_type=Collection)
        collection.delete()
        return CollectionDelete(success=True)

# Collection Mutations
class CollectionAddProducts(relay.ClientIDMutation):
    collection = graphene.Field(Collection, description="Collection to which products will be added.")

    class Input:
        collection_id = graphene.ID(required=True, description="ID of a collection.")
        products = NonNullList(graphene.ID, required=True, description="List of product IDs.")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        collection_id = input.get("collection_id")
        products = input.get("products")

        # Fetch collection and products in a single query
        collection = cls.get_node_or_error(
            info, collection_id, field="collection_id", only_type=Collection
        )
        products = cls.get_nodes_or_error(
            products,
            "products",
            Product,
            qs=Product.objects.prefetched_for_webhook(single_object=False),
        )

        # Validate products before adding
        cls.clean_products(products)

        manager = get_plugin_manager_promise(info.context).get()
        with transaction.atomic():
            # Add products to collection
            collection.products.add(*products)

            # Recalculate discounts if the collection is on sale
            if collection.sale_set.exists():
                update_products_discounted_prices_task.delay([p.pk for p in products])

            # Trigger product update events
            for product in products:
                cls.call_event(manager.product_updated, product)

        return CollectionAddProducts(
            collection=ChannelContext(node=collection, channel_slug=None)
        )

    @classmethod
    def clean_products(cls, products):
        """Ensure products have variants before adding to a collection."""
        products_ids_without_variants = get_products_ids_without_variants(products)
        if products_ids_without_variants:
            raise ValidationError({
                "products": ValidationError(
                    "Cannot manage products without variants.",
                    code=CollectionErrorCode.CANNOT_MANAGE_PRODUCT_WITHOUT_VARIANT.value,
                    params={"products": products_ids_without_variants},
                )
            })

class CollectionRemoveProducts(relay.ClientIDMutation):
    collection = graphene.Field(Collection, description="Collection from which products will be removed.")

    class Input:
        collection_id = graphene.ID(required=True, description="ID of a collection.")
        products = NonNullList(graphene.ID, required=True, description="List of product IDs.")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        collection_id = input.get("collection_id")
        products = input.get("products")

        # Fetch collection and products in a single query
        collection = cls.get_node_or_error(
            info, collection_id, field="collection_id", only_type=Collection
        )
        products = cls.get_nodes_or_error(
            products,
            "products",
            Product,
            qs=Product.objects.prefetched_for_webhook(single_object=False),
        )

        manager = get_plugin_manager_promise(info.context).get()
        with transaction.atomic():
            # Remove products from collection
            collection.products.remove(*products)

            # Recalculate discounts if the collection is on sale
            if collection.sale_set.exists():
                update_products_discounted_prices_task.delay([p.pk for p in products])

            # Trigger product update events
            for product in products:
                cls.call_event(manager.product_updated, product)

        return CollectionRemoveProducts(
            collection=ChannelContext(node=collection, channel_slug=None)
        )

class CollectionReorderProducts(relay.ClientIDMutation):
    collection = graphene.Field(Collection, description="Collection from which products are reordered.")

    class Input:
        collection_id = graphene.ID(required=True, description="ID of a collection.")
        moves = NonNullList(MoveProductInput, required=True, description="List of product reordering operations.")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        collection_id = input.get("collection_id")
        moves = input.get("moves")

        # Fetch collection
        collection = cls.get_node_or_error(
            info, collection_id, field="collection_id", only_type=Collection
        )

        # Resolve products and their sort orders
        operations = {}
        for move_info in moves:
            product_id = move_info.product_id
            product_pk = cls.get_global_id_or_error(product_id, only_type=Product, field="moves")

            try:
                m2m_info = collection.collectionproduct.get(product_id=int(product_pk))
                operations[m2m_info.pk] = move_info.sort_order
            except ObjectDoesNotExist:
                raise ValidationError({
                    "moves": ValidationError(
                        f"Couldn't resolve to a product: {product_id}",
                        code=CollectionErrorCode.NOT_FOUND.value,
                    )
                })

        # Perform reordering within a transaction
        with transaction.atomic():
            perform_reordering(collection.collectionproduct.all(), operations)

        return CollectionReorderProducts(
            collection=ChannelContext(node=collection, channel_slug=None)
        )


class UpdateCategorySearchVector(graphene.Mutation):
    success = graphene.Boolean()

    @classmethod
    def mutate(cls, root, info):
        categories = Category.objects.all()
        for category in categories:
            category.search_vector = (
                SearchVector('name', weight='A') +
                SearchVector('slug', weight='A') +
                SearchVector('description_plaintext', weight='B')
            )
            category.save(update_fields=['search_vector'])
        return UpdateCategorySearchVector(success=True)



# Input Types
class MoveProductInput(InputObjectType):
    product_id = graphene.ID(required=True, description="The ID of the product to move.")
    sort_order = graphene.Int(
        required=True,
        description=(
            "The relative sorting position of the product (from -inf to +inf). "
            "1 moves the item forward, -1 moves it backward, 0 leaves it unchanged."
        ),
    )

class StockInput(InputObjectType):
    warehouse = graphene.ID(required=True, description="Warehouse in which stock is located.")
    quantity = graphene.Int(required=True, description="Quantity of items available for sale.")

class StockUpdateInput(InputObjectType):
    stock = graphene.ID(required=True, description="Stock.")
    quantity = graphene.Int(required=True, description="Quantity of items available for sale.")




# Input Types
class ProductTypeInput(InputObjectType):
    name = graphene.String(description="Name of the product type.")
    slug = graphene.String(description="Product type slug.")
    kind = graphene.Enum.from_enum(ProductTypeKind)(description="The product type kind.")
    has_variants = graphene.Boolean(
        description=(
            "Determines if product of this type has multiple variants. This option "
            "mainly simplifies product management in the dashboard. There is always at "
            "least one variant created under the hood."
        )
    )
    product_attributes = NonNullList(
        graphene.ID,
        description="List of attributes shared among all product variants.",
        name="productAttributes",
    )
    variant_attributes = NonNullList(
        graphene.ID,
        description=(
            "List of attributes used to distinguish between different variants of "
            "a product."
        ),
        name="variantAttributes",
    )
    is_shipping_required = graphene.Boolean(
        description="Determines if shipping is required for products of this variant."
    )
    is_digital = graphene.Boolean(
        description="Determines if products are digital.", required=False
    )
    weight = graphene.Float(description="Weight of the ProductType items.")
    tax_code = graphene.String(
        description=(
            f"Tax rate for enabled tax gateway. {DEPRECATED_IN_3X_INPUT}. "
            "Use tax classes to control the tax calculation for a product type. "
            "If taxCode is provided,  will try to find a tax class with given "
            "code (codes are stored in metadata) and assign it. If no tax class is "
            "found, it would be created and assigned."
        )
    )
    tax_class = graphene.ID(
        description=(
            "ID of a tax class to assign to this product type. All products of this "
            "product type would use this tax class, unless it's overridden in the "
            "`Product` type."
        ),
        required=False,
    )

# Product Type Mutations
class ProductTypeCreate(relay.ClientIDMutation):
    class Input:
        input = ProductTypeInput(
            required=True, description="Fields required to create a product type."
        )

    success = graphene.Boolean()
    product_type = graphene.Field(ProductType)

    @classmethod
    def clean_product_kind(cls, _instance, data):
        """Fallback to ProductTypeKind.NORMAL if kind is not provided."""
        return data.get("kind", ProductTypeKind.NORMAL)

    @classmethod
    def clean_input(cls, info: ResolveInfo, instance, data, **kwargs):
        cleaned_input = super().clean_input(info, instance, data, **kwargs)
        cleaned_input["kind"] = cls.clean_product_kind(instance, cleaned_input)

        # Validate weight
        weight = cleaned_input.get("weight")
        if weight and weight < 0:
            raise ValidationError({
                "weight": ValidationError(
                    "Product type can't have negative weight.",
                    code=ProductErrorCode.INVALID.value,
                )
            })

        # Generate slug if not provided
        try:
            cleaned_input = validate_slug_and_generate_if_needed(
                instance, "name", cleaned_input
            )
        except ValidationError as error:
            error.code = ProductErrorCode.REQUIRED.value
            raise ValidationError({"slug": error})

        # Clean tax code
        manager = get_plugin_manager_promise(info.context).get()
        clean_tax_code(cleaned_input, manager)

        # Validate attributes
        cls.validate_attributes(cleaned_input)
        return cleaned_input

    @classmethod
    def validate_attributes(cls, cleaned_data):
        errors = {}
        for field in ["product_attributes", "variant_attributes"]:
            attributes = cleaned_data.get(field)
            if attributes:
                invalid_attributes = [
                    graphene.Node.to_global_id("Attribute", attr.pk)
                    for attr in attributes
                    if attr.type != AttributeType.PRODUCT_TYPE
                ]
                if invalid_attributes:
                    errors[field] = ValidationError(
                        "Only product type attributes are allowed.",
                        code=ProductErrorCode.INVALID.value,
                        params={"attributes": invalid_attributes},
                    )
        if errors:
            raise ValidationError(errors)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        input_data = input.get("input")
        product_type = ProductType()

        # Clean and validate input
        cleaned_input = cls.clean_input(info, product_type, input_data)

        # Save product type
        with transaction.atomic():
            for field, value in cleaned_input.items():
                setattr(product_type, field, value)
            product_type.save()

            # Save many-to-many fields
            if "product_attributes" in cleaned_input:
                product_type.product_attributes.set(cleaned_input["product_attributes"])
            if "variant_attributes" in cleaned_input:
                product_type.variant_attributes.set(cleaned_input["variant_attributes"])

        return ProductTypeCreate(success=True, product_type=product_type)

class ProductTypeUpdate(relay.ClientIDMutation, ProductTypeCreate):
    class Input:
        id = graphene.ID(required=True, description="ID of a product type to update.")
        input = ProductTypeInput(
            required=True, description="Fields required to update a product type."
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        product_type_id = input.get("id")
        input_data = input.get("input")

        # Fetch product type
        product_type = cls.get_node_or_error(info, product_type_id, only_type=ProductType)

        # Clean and validate input
        cleaned_input = cls.clean_input(info, product_type, input_data)

        # Update product type
        with transaction.atomic():
            for field, value in cleaned_input.items():
                setattr(product_type, field, value)
            product_type.save()

            # Update many-to-many fields
            if "product_attributes" in cleaned_input:
                product_type.product_attributes.set(cleaned_input["product_attributes"])
            if "variant_attributes" in cleaned_input:
                product_type.variant_attributes.set(cleaned_input["variant_attributes"])

            # Trigger variant name updates if variant attributes changed
            if "variant_attributes" in cleaned_input:
                update_variants_names.delay(
                    product_type.pk,
                    [attr.pk for attr in cleaned_input["variant_attributes"]]
                )

        return ProductTypeUpdate(success=True, product_type=product_type)

class ProductTypeDelete(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True, description="ID of a product type to delete.")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        product_type_id = input.get("id")

        # Fetch product type and related variants
        product_type = cls.get_node_or_error(info, product_type_id, only_type=ProductType)
        variants_pks = Product.objects.filter(product_type=product_type).values_list("variants__pk", flat=True)

        # Delete related attribute values and order lines
        with transaction.atomic():
            AttributeValue.objects.filter(
                Q(attribute__input_type__in=AttributeInputType.TYPES_WITH_UNIQUE_VALUES) &
                (Q(productassignments__assignment__product_type=product_type) |
                 Q(variantassignments__assignment__product_type=product_type))
            ).delete()

            OrderLine.objects.filter(
                variant__pk__in=variants_pks, order__status=OrderStatus.DRAFT
            ).delete()

            product_type.delete()

        return ProductTypeDelete(success=True)



# Input Types
class ReorderInput(InputObjectType):
    id = graphene.ID(required=True, description="The ID of the item to reorder.")
    sort_order = graphene.Int(
        required=True,
        description=(
            "The relative sorting position of the item (from -inf to +inf). "
            "1 moves the item forward, -1 moves it backward, 0 leaves it unchanged."
        ),
    )

# Product Variant Mutations
class ProductVariantPreorderDeactivate(relay.ClientIDMutation):
    product_variant = graphene.Field(
        ProductVariant, description="Product variant with ended preorder."
    )

    class Input:
        id = graphene.ID(
            required=True, description="ID of the variant to deactivate preorder."
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **data):
        variant = cls.get_node_or_error(info, data.get("id"), only_type=ProductVariant)
        if not variant.is_preorder:
            raise ValidationError({
                "id": ValidationError(
                    "Variant is not in preorder.",
                    code=ProductErrorCode.INVALID.value,
                )
            })

        with transaction.atomic():
            deactivate_preorder_for_variant(variant)
            manager = get_plugin_manager_promise(info.context).get()
            cls.call_event(manager.product_variant_updated, variant)

        return ProductVariantPreorderDeactivate(product_variant=variant)

class ProductVariantReorder(relay.ClientIDMutation):
    product = graphene.Field(Product)

    class Input:
        product_id = graphene.ID(
            required=True,
            description="ID of the product whose variants will be reordered.",
        )
        moves = NonNullList(
            ReorderInput,
            required=True,
            description="List of variant reordering operations.",
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **data):
        product_id = data.get("product_id")
        moves = data.get("moves")

        # Fetch product and variants
        product = cls.get_node_or_error(info, product_id, only_type=Product)
        variants = product.variants.all()

        # Validate and process moves
        operations = {}
        for move_info in moves:
            variant_id = move_info.id
            variant = cls.get_node_or_error(info, variant_id, only_type=ProductVariant)
            if variant.product != product:
                raise ValidationError({
                    "moves": ValidationError(
                        f"Variant {variant_id} does not belong to the product.",
                        code=ProductErrorCode.NOT_PRODUCTS_VARIANT.value,
                    )
                })
            operations[variant.pk] = move_info.sort_order

        # Perform reordering
        with transaction.atomic():
            perform_reordering(variants, operations)
            product.save(update_fields=["updated_at"])

        # Trigger product update event
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.product_updated, product)

        return ProductVariantReorder(
            product=ChannelContext(node=product, channel_slug=None)
        )

class ProductVariantSetDefault(relay.ClientIDMutation):
    product = graphene.Field(Product)

    class Input:
        product_id = graphene.ID(
            required=True,
            description="ID of the product for which the default variant will be set.",
        )
        variant_id = graphene.ID(
            required=True, description="ID of the variant to set as default."
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **data):
        product_id = data.get("product_id")
        variant_id = data.get("variant_id")

        # Fetch product and variant
        product = cls.get_node_or_error(info, product_id, only_type=Product)
        variant = cls.get_node_or_error(info, variant_id, only_type=ProductVariant)

        # Ensure variant belongs to the product
        if variant.product != product:
            raise ValidationError({
                "variant_id": ValidationError(
                    "Provided variant doesn't belong to the provided product.",
                    code=ProductErrorCode.NOT_PRODUCTS_VARIANT.value,
                )
            })

        # Set the default variant
        with transaction.atomic():
            product.default_variant = variant
            product.save(update_fields=["default_variant", "updated_at"])

        # Trigger product update event
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.product_updated, product)

        return ProductVariantSetDefault(
            product=ChannelContext(node=product, channel_slug=None)
        )

class VariantMediaAssign(relay.ClientIDMutation):
    product_variant = graphene.Field(ProductVariant)
    media = graphene.Field(ProductMedia)

    class Input:
        media_id = graphene.ID(
            required=True, description="ID of a product media to assign to a variant."
        )
        variant_id = graphene.ID(required=True, description="ID of a product variant.")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        media_id = input.get("media_id")
        variant_id = input.get("variant_id")

        # Fetch media and variant
        media = cls.get_node_or_error(info, media_id, only_type=ProductMedia)
        variant = cls.get_node_or_error(info, variant_id, only_type=ProductVariant)

        # Ensure media belongs to the product
        if not variant.product.media.filter(pk=media.pk).exists():
            raise ValidationError({
                "media_id": ValidationError(
                    "This media doesn't belong to the specified product.",
                    code=ProductErrorCode.NOT_PRODUCTS_IMAGE.value,
                )
            })

        # Assign media to variant
        with transaction.atomic():
            _, created = media.variant_media.get_or_create(variant=variant)
            if not created:
                raise ValidationError({
                    "media_id": ValidationError(
                        "This media is already assigned to the variant.",
                        code=ProductErrorCode.MEDIA_ALREADY_ASSIGNED.value,
                    )
                })

        # Trigger variant update event
        variant_context = ChannelContext(node=variant, channel_slug=None)
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.product_variant_updated, variant_context.node)

        return VariantMediaAssign(product_variant=variant_context, media=media)

class VariantMediaUnassign(relay.ClientIDMutation):
    product_variant = graphene.Field(ProductVariant)
    media = graphene.Field(ProductMedia)

    class Input:
        media_id = graphene.ID(
            required=True,
            description="ID of a product media to unassign from a variant.",
        )
        variant_id = graphene.ID(required=True, description="ID of a product variant.")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        media_id = input.get("media_id")
        variant_id = input.get("variant_id")

        # Fetch media and variant
        media = cls.get_node_or_error(info, media_id, only_type=ProductMedia)
        variant = cls.get_node_or_error(info, variant_id, only_type=ProductVariant)

        # Unassign media from variant
        with transaction.atomic():
            try:
                variant_media = VariantMedia.objects.get(media=media, variant=variant)
                variant_media.delete()
            except VariantMedia.DoesNotExist:
                raise ValidationError({
                    "media_id": ValidationError(
                        "This media is not assigned to the variant.",
                        code=ProductErrorCode.NOT_PRODUCTS_IMAGE.value,
                    )
                })

        # Trigger variant update event
        variant_context = ChannelContext(node=variant, channel_slug=None)
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.product_variant_updated, variant_context.node)

        return VariantMediaUnassign(product_variant=variant_context, media=media)


# Input Types
class ProductAttributeAssignInput(InputObjectType):
    id = graphene.ID(required=True, description="The ID of the attribute to assign.")
    type = ProductAttributeType(
        required=True, description="The attribute type to be assigned as."
    )
    variant_selection = graphene.Boolean(
        required=False,
        description=(
            "Whether attribute is allowed in variant selection. "
            f"Allowed types are: {AttributeInputType.ALLOWED_IN_VARIANT_SELECTION}."
        ),
    )

class ProductAttributeAssignmentUpdateInput(InputObjectType):
    id = graphene.ID(required=True, description="The ID of the attribute to assign.")
    variant_selection = graphene.Boolean(
        required=True,
        description=(
            "Whether attribute is allowed in variant selection. "
            f"Allowed types are: {AttributeInputType.ALLOWED_IN_VARIANT_SELECTION}."
        ),
    )

class ReorderInput(InputObjectType):
    id = graphene.ID(required=True, description="The ID of the item to reorder.")
    sort_order = graphene.Int(
        required=True,
        description=(
            "The relative sorting position of the item (from -inf to +inf). "
            "1 moves the item forward, -1 moves it backward, 0 leaves it unchanged."
        ),
    )

# Mixin for Variant Assignment Validation
class VariantAssignmentValidationMixin:
    @classmethod
    def check_allowed_types(cls, errors: DefaultDict[str, List[ValidationError]], variant_attrs_data: List[Tuple[int, bool, str]]):
        """Ensure variant selection is allowed for the attribute type."""
        variant_attrs_pks = [
            pk for pk, variant_selection, _ in variant_attrs_data if variant_selection
        ]
        qs = (
            Attribute.objects.filter(pk__in=variant_attrs_pks)
            .exclude(input_type__in=AttributeInputType.ALLOWED_IN_VARIANT_SELECTION)
            .values_list("pk", "name", "input_type")
        )

        invalid_attributes = list(qs)

        if invalid_attributes:
            invalid_attr_ids = [
                graphene.Node.to_global_id("Attribute", pk)
                for pk, _, __ in invalid_attributes
            ]
            error = ValidationError(
                (
                    f"Some of the attributes types are not supported for "
                    "variant selection. Supported types are: "
                    f"{AttributeInputType.ALLOWED_IN_VARIANT_SELECTION}."
                ),
                code=ProductErrorCode.ATTRIBUTE_CANNOT_BE_ASSIGNED.value,
                params={"attributes": invalid_attr_ids},
            )
            errors["operations"].append(error)

# Product Attribute Mutations
class ProductAttributeAssign(relay.ClientIDMutation, VariantAssignmentValidationMixin):
    product_type = graphene.Field(ProductType, description="The updated product type.")

    class Input:
        product_type_id = graphene.ID(
            required=True,
            description="ID of the product type to assign the attributes into.",
        )
        operations = NonNullList(
            ProductAttributeAssignInput,
            required=True,
            description="The operations to perform.",
        )

    @classmethod
    def get_operations(cls, info, operations: List[ProductAttributeAssignInput]):
        """Resolve all passed global IDs into integer PKs of the Attribute type."""
        product_attrs_data = []
        variant_attrs_data = []
        for operation in operations:
            pk = cls.get_global_id_or_error(
                operation.id, only_type=Attribute, field="operations"
            )
            variant_selection = operation.variant_selection if operation.variant_selection is not None else False

            if operation.type == ProductAttributeType.PRODUCT:
                product_attrs_data.append((pk, variant_selection, operation.type))
            else:
                variant_attrs_data.append((pk, variant_selection, operation.type))
        return product_attrs_data, variant_attrs_data

    @classmethod
    def clean_operations(cls, product_type: ProductType, product_attrs_data: List[Tuple[int, bool, str]], variant_attrs_data: List[Tuple[int, bool, str]]):
        """Ensure the attributes are not already assigned to the product type."""
        errors: DefaultDict[str, List[ValidationError]] = defaultdict(list)
        product_attrs_pks = [pk for pk, _, __ in product_attrs_data]
        variant_attrs_pks = [pk for pk, _, __ in variant_attrs_data]

        # Check if attributes exist
        attributes = Attribute.objects.filter(id__in=product_attrs_pks + variant_attrs_pks).values_list("pk", flat=True)
        if len(product_attrs_pks + variant_attrs_pks) != len(attributes):
            invalid_attrs = set(product_attrs_pks + variant_attrs_pks) - set(attributes)
            invalid_attrs = [
                graphene.Node.to_global_id("Attribute", pk) for pk in invalid_attrs
            ]
            error = ValidationError(
                "Attribute doesn't exist.",
                code=ProductErrorCode.NOT_FOUND.value,
                params={"attributes": list(invalid_attrs)},
            )
            errors["operations"].append(error)

        # Check if attributes are already assigned
        assigned_attributes = Attribute.objects.get_assigned_product_type_attributes(product_type.pk)
        if assigned_attributes.filter(id__in=product_attrs_pks + variant_attrs_pks).exists():
            error = ValidationError(
                "Some attributes are already assigned to this product type.",
                code=ProductErrorCode.ATTRIBUTE_ALREADY_ASSIGNED.value,
            )
            errors["operations"].append(error)

        # Check if attributes are valid for variant selection
        cls.check_allowed_types(errors, variant_attrs_data)

        if errors:
            raise ValidationError(errors)

    @classmethod
    def save_field_values(cls, product_type: ProductType, model_name: str, pks: List[Tuple[int, bool, str]]):
        """Add in bulk the PKs to assign to a given product type."""
        if model_name == "AttributeVariant":
            for pk, variant_selection, _ in pks:
                AttributeVariant.objects.create(
                    product_type=product_type,
                    attribute_id=pk,
                    variant_selection=variant_selection,
                )
        else:
            for pk, _, _ in pks:
                AttributeProduct.objects.create(
                    product_type=product_type,
                    attribute_id=pk,
                )

    @classmethod
    def mutate_and_get_payload(cls, _root, info: ResolveInfo, **data):
        product_type_id: str = data["product_type_id"]
        operations: List[ProductAttributeAssignInput] = data["operations"]

        # Retrieve the requested product type
        product_type = graphene.Node.get_node_from_global_id(
            info, product_type_id, only_type=ProductType
        )

        # Resolve all the passed IDs to ints
        product_attrs_data, variant_attrs_data = cls.get_operations(info, operations)
        variant_attrs_pks = [pk for pk, _, __ in variant_attrs_data]

        if variant_attrs_pks and not product_type.has_variants:
            raise ValidationError(
                {
                    "operations": ValidationError(
                        "Variants are disabled in this product type.",
                        code=ProductErrorCode.ATTRIBUTE_VARIANTS_DISABLED.value,
                    )
                }
            )

        # Ensure the attributes are assignable
        cls.clean_operations(product_type, product_attrs_data, variant_attrs_data)

        with transaction.atomic():
            # Commit
            cls.save_field_values(product_type, "AttributeProduct", product_attrs_data)
            cls.save_field_values(product_type, "AttributeVariant", variant_attrs_data)

        return cls(product_type=product_type)


# Product Attribute Unassign Mutation
class ProductAttributeUnassign(relay.ClientIDMutation):
    product_type = graphene.Field(ProductType, description="The updated product type.")

    class Input:
        product_type_id = graphene.ID(
            required=True,
            description="ID of the product type from which the attributes should be unassigned.",
        )
        attribute_ids = NonNullList(
            graphene.ID,
            required=True,
            description="The IDs of the attributes to unassign.",
        )

    @classmethod
    def mutate_and_get_payload(cls, _root, info: ResolveInfo, **data):
        product_type_id: str = data["product_type_id"]
        attribute_ids: List[str] = data["attribute_ids"]

        # Retrieve the requested product type
        product_type = graphene.Node.get_node_from_global_id(
            info, product_type_id, only_type=ProductType
        )

        # Resolve all the passed IDs to ints
        attribute_pks = [
            cls.get_global_id_or_error(attr_id, only_type=Attribute, field="attribute_id")
            for attr_id in attribute_ids
        ]

        with transaction.atomic():
            # Unassign attributes
            product_type.product_attributes.remove(*attribute_pks)
            product_type.variant_attributes.remove(*attribute_pks)

            # Mark products as needing reindexing
            product_type.products.all().update(search_index_dirty=True)

        return cls(product_type=product_type)


# Product Attribute Assignment Update Mutation
class ProductAttributeAssignmentUpdate(relay.ClientIDMutation, VariantAssignmentValidationMixin):
    product_type = graphene.Field(ProductType, description="The updated product type.")

    class Input:
        product_type_id = graphene.ID(
            required=True,
            description="ID of the product type to assign the attributes into.",
        )
        operations = NonNullList(
            ProductAttributeAssignmentUpdateInput,
            required=True,
            description="The operations to perform.",
        )

    @classmethod
    def mutate_and_get_payload(cls, _root, info: ResolveInfo, **data):
        product_type_id: str = data["product_type_id"]
        operations: List[ProductAttributeAssignmentUpdateInput] = data["operations"]

        # Retrieve the requested product type
        product_type = graphene.Node.get_node_from_global_id(
            info, product_type_id, only_type=ProductType
        )

        # Resolve all the passed IDs to ints
        variant_attrs_data = [
            (
                cls.get_global_id_or_error(op.id, only_type=Attribute, field="operations"),
                op.variant_selection,
            )
            for op in operations
        ]
        variant_attrs_pks = [pk for pk, _ in variant_attrs_data]

        if variant_attrs_pks and not product_type.has_variants:
            raise ValidationError(
                {
                    "operations": ValidationError(
                        "Variants are disabled in this product type.",
                        code=ProductErrorCode.ATTRIBUTE_VARIANTS_DISABLED.value,
                    )
                }
            )

        # Ensure the attributes are assignable
        cls.clean_operations(product_type, [], variant_attrs_data)

        with transaction.atomic():
            # Update variant selection
            for pk, variant_selection in variant_attrs_data:
                AttributeVariant.objects.filter(
                    product_type=product_type, attribute_id=pk
                ).update(variant_selection=variant_selection)

        return cls(product_type=product_type)


# Product Type Reorder Attributes Mutation
class ProductTypeReorderAttributes(relay.ClientIDMutation, VariantAssignmentValidationMixin):
    product_type = graphene.Field(ProductType, description="The updated product type.")

    class Input:
        product_type_id = graphene.ID(
            required=True,
            description="ID of the product type to reorder attributes for.",
        )
        type = ProductAttributeType(
            required=True,
            description="The attribute type to reorder.",
        )
        moves = NonNullList(
            ReorderInput,
            required=True,
            description="The list of attribute reordering operations.",
        )

    @classmethod
    def mutate_and_get_payload(cls, _root, info: ResolveInfo, **data):
        product_type_id: str = data["product_type_id"]
        attribute_type: str = data["type"]
        moves: List[ReorderInput] = data["moves"]

        # Retrieve the requested product type
        product_type = graphene.Node.get_node_from_global_id(
            info, product_type_id, only_type=ProductType
        )

        # Determine the M2M field to reorder
        m2m_field = (
            "attributeproduct" if attribute_type == ProductAttributeType.PRODUCT else "attributevariant"
        )
        attributes_m2m = getattr(product_type, m2m_field)

        # Prepare operations
        operations = {}
        for move in moves:
            attr_id = cls.get_global_id_or_error(move.id, only_type=Attribute, field="moves")
            operations[attr_id] = move.sort_order

        with transaction.atomic():
            perform_reordering(attributes_m2m, operations)

        return cls(product_type=product_type)


class ProductReorderAttributeValues(relay.ClientIDMutation, VariantAssignmentValidationMixin):
    product = graphene.Field(
        Product, description="Product from which attribute values are reordered."
    )

    

    class Input:
        product_id = graphene.Argument(
            graphene.ID, required=True, description="ID of a product."
        )
        attribute_id = graphene.Argument(
            graphene.ID, required=True, description="ID of an attribute."
        )
        moves = NonNullList(
            ReorderInput,
            required=True,
            description="The list of reordering operations for given attribute values.",
        )

    @classmethod
    def perform(
        cls,
        instance_id: str,
        instance_type: str,
        data: dict,
        assignment_lookup: str,
        error_code_enum,
    ):
        attribute_id = data["attribute_id"]
        moves = data["moves"]

        instance = cls.get_instance(instance_id)
        cls.validate_attribute_assignment(
            instance, instance_type, attribute_id, error_code_enum
        )
        values_m2m = getattr(instance, assignment_lookup)

        try:
            operations = cls.prepare_operations(moves, values_m2m)
        except ValidationError as e:
            e.code = error_code_enum.NOT_FOUND.value
            raise ValidationError({"moves": e}) from e

        with traced_atomic_transaction():
            perform_reordering(values_m2m, operations)

        return instance

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        product_id = data["product_id"]
        product = cls.perform(
            product_id, "product", data, "attributevalues", ProductErrorCode
        )

        return ProductReorderAttributeValues(
            product=ChannelContext(node=product, channel_slug=None)
        )

    @classmethod
    def get_instance(cls, instance_id: str):
        pk = cls.get_global_id_or_error(
            instance_id, only_type=Product, field="product_id"
        )

        try:
            product = models.Product.objects.get(pk=pk)
        except ObjectDoesNotExist as e:
            raise ValidationError(
                {
                    "product_id": ValidationError(
                        (f"Couldn't resolve to a product: {instance_id}"),
                        code=ProductErrorCode.NOT_FOUND.value,
                    )
                }
            ) from e
        return product

    @classmethod
    def validate_attribute_assignment(
        cls, instance, instance_type, attribute_id: str, error_code_enum
    ):
        """Validate if this attribute_id is assigned to this product."""
        attribute_pk = cls.get_global_id_or_error(
            attribute_id, only_type=Attribute, field="attribute_id"
        )

        attribute_assignment = attribute_models.AttributeProduct.objects.filter(
            attribute_id=attribute_pk, product_type_id=instance.product_type_id
        ).exists()

        if not attribute_assignment:
            raise ValidationError(
                {
                    "attribute_id": ValidationError(
                        f"Couldn't resolve to a {instance_type} "
                        f"attribute: {attribute_id}.",
                        code=error_code_enum.NOT_FOUND.value,
                    )
                }
            )
        return attribute_assignment


class ProductVariantReorderAttributeValues(relay.ClientIDMutation, VariantAssignmentValidationMixin):
    product_variant = graphene.Field(
        ProductVariant,
        description="Product variant from which attribute values are reordered.",
    )

    class Input:
        variant_id = graphene.Argument(
            graphene.ID, required=True, description="ID of a product variant."
        )
        attribute_id = graphene.Argument(
            graphene.ID, required=True, description="ID of an attribute."
        )
        moves = NonNullList(
            ReorderInput,
            required=True,
            description="The list of reordering operations for given attribute values.",
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        variant_id = data["variant_id"]
        variant = cls.perform(
            variant_id, "variant", data, "variantvalueassignment", ProductErrorCode
        )

        return ProductVariantReorderAttributeValues(
            product_variant=ChannelContext(node=variant, channel_slug=None)
        )

    @classmethod
    def get_instance(cls, instance_id: str):
        pk = cls.get_global_id_or_error(
            instance_id, only_type=ProductVariant, field="variant_id"
        )

        try:
            variant = models.ProductVariant.objects.prefetch_related("attributes").get(
                pk=pk
            )
        except ObjectDoesNotExist as e:
            raise ValidationError(
                {
                    "variant_id": ValidationError(
                        (f"Couldn't resolve to a product variant: {instance_id}"),
                        code=ProductErrorCode.NOT_FOUND.value,
                    )
                }
            ) from e
        return variant

# Product Reorder Attribute Values Mutation
class ProductReorderAttributeValues(relay.ClientIDMutation):
    product = graphene.Field(
        Product, description="Product from which attribute values are reordered."
    )

    class Input:
        product_id = graphene.ID(
            required=True, description="ID of a product."
        )
        attribute_id = graphene.ID(
            required=True, description="ID of an attribute."
        )
        moves = NonNullList(
            ReorderInput,
            required=True,
            description="The list of reordering operations for given attribute values.",
        )

    @classmethod
    def perform(
        cls,
        instance_id: str,
        instance_type: str,
        data: Dict,
        assignment_lookup: str,
        error_code_enum,
    ):
        attribute_id = data["attribute_id"]
        moves = data["moves"]

        # Fetch the instance (product or variant)
        instance = cls.get_instance(instance_id, instance_type, error_code_enum)

        # Validate attribute assignment
        cls.validate_attribute_assignment(
            instance, instance_type, attribute_id, error_code_enum
        )

        # Get the M2M field for attribute values
        values_m2m = getattr(instance, assignment_lookup)

        # Prepare operations for reordering
        try:
            operations = cls.prepare_operations(moves, values_m2m)
        except ValidationError as e:
            e.code = error_code_enum.NOT_FOUND.value
            raise ValidationError({"moves": e}) from e

        # Perform reordering within a transaction
        with transaction.atomic():
            perform_reordering(values_m2m, operations)

        return instance

    @classmethod
    def mutate_and_get_payload(cls, root, info: ResolveInfo, **data):
        product_id = data["product_id"]
        product = cls.perform(
            product_id, "product", data, "attributevalues", ProductErrorCode
        )

        return ProductReorderAttributeValues(
            product=ChannelContext(node=product, channel_slug=None)
        )

    @classmethod
    def get_instance(cls, instance_id: str, instance_type: str, error_code_enum):
        """Fetch the instance (product or variant) by ID."""
        if instance_type == "product":
            model = Product
            field = "product_id"
        else:
            model = ProductVariant
            field = "variant_id"

        pk = cls.get_global_id_or_error(instance_id, only_type=model, field=field)

        try:
            instance = model.objects.get(pk=pk)
        except ObjectDoesNotExist as e:
            raise ValidationError({
                field: ValidationError(
                    f"Couldn't resolve to a {instance_type}: {instance_id}",
                    code=error_code_enum.NOT_FOUND.value,
                )
            }) from e

        return instance

    @classmethod
    def validate_attribute_assignment(
        cls, instance, instance_type: str, attribute_id: str, error_code_enum
    ):
        """Validate if the attribute is assigned to the instance."""
        attribute_pk = cls.get_global_id_or_error(
            attribute_id, only_type=Attribute, field="attribute_id"
        )

        if instance_type == "product":
            attribute_assignment = AttributeProduct.objects.filter(
                attribute_id=attribute_pk, product_type_id=instance.product_type_id
            ).exists()
        else:
            attribute_assignment = instance.attributes.filter(id=attribute_pk).exists()

        if not attribute_assignment:
            raise ValidationError({
                "attribute_id": ValidationError(
                    f"Couldn't resolve to a {instance_type} attribute: {attribute_id}.",
                    code=error_code_enum.NOT_FOUND.value,
                )
            })

# Product Variant Reorder Attribute Values Mutation
class ProductVariantReorderAttributeValues(relay.ClientIDMutation):
    product_variant = graphene.Field(
        ProductVariant,
        description="Product variant from which attribute values are reordered.",
    )

    class Input:
        variant_id = graphene.ID(
            required=True, description="ID of a product variant."
        )
        attribute_id = graphene.ID(
            required=True, description="ID of an attribute."
        )
        moves = NonNullList(
            ReorderInput,
            required=True,
            description="The list of reordering operations for given attribute values.",
        )

    @classmethod
    def mutate_and_get_payload(cls, root, info: ResolveInfo, **data):
        variant_id = data["variant_id"]
        variant = cls.perform(
            variant_id, "variant", data, "variantvalueassignment", ProductErrorCode
        )

        return ProductVariantReorderAttributeValues(
            product_variant=ChannelContext(node=variant, channel_slug=None)
        )




class ProductMutations(graphene.ObjectType):
    product_attribute_assign = ProductAttributeAssign.Field()
    product_attribute_assignment_update = ProductAttributeAssignmentUpdate.Field()
    product_attribute_unassign = ProductAttributeUnassign.Field()

    category_create = CategoryCreate.Field()
    category_delete = CategoryDelete.Field()
    category_update = CategoryUpdate.Field()
    category_translate = CategoryTranslate.Field()

    collection_add_products = CollectionAddProducts.Field()
    collection_create = CollectionCreate.Field()
    collection_delete = CollectionDelete.Field()
    collection_reorder_products = CollectionReorderProducts.Field()
    collection_remove_products = CollectionRemoveProducts.Field()
    collection_update = CollectionUpdate.Field()
    collection_translate = CollectionTranslate.Field()
    collection_channel_listing_update = CollectionChannelListingUpdate.Field()

    product_create = ProductCreate.Field()
    product_delete = ProductDelete.Field()
    product_update = ProductUpdate.Field()
    product_translate = ProductTranslate.Field()

    product_channel_listing_update = ProductChannelListingUpdate.Field()

    product_media_create = ProductMediaCreate.Field()
    product_media_delete = ProductMediaDelete.Field()
    product_media_reorder = ProductMediaReorder.Field()
    product_media_update = ProductMediaUpdate.Field()

    product_type_create = ProductTypeCreate.Field()
    product_type_delete = ProductTypeDelete.Field()
    product_type_update = ProductTypeUpdate.Field()
    product_type_reorder_attributes = ProductTypeReorderAttributes.Field()
    product_reorder_attribute_values = ProductReorderAttributeValues.Field()

    digital_content_create = DigitalContentCreate.Field()
    digital_content_delete = DigitalContentDelete.Field()
    digital_content_update = DigitalContentUpdate.Field()

    digital_content_url_create = DigitalContentUrlCreate.Field()

    product_variant_create = ProductVariantCreate.Field()
    product_variant_delete = ProductVariantDelete.Field()
    product_variant_update = ProductVariantUpdate.Field()
    product_variant_reorder = ProductVariantReorder.Field()
    
    product_variant_stocks_create = ProductVariantStocksCreate.Field()
    product_variant_stocks_delete = ProductVariantStocksDelete.Field()
    product_variant_stocks_update = ProductVariantStocksUpdate.Field()
    
    product_variant_set_default = ProductVariantSetDefault.Field()
    product_variant_translate = ProductVariantTranslate.Field()
    product_variant_channel_listing_update = ProductVariantChannelListingUpdate.Field()
    product_variant_reorder_attribute_values = (ProductVariantReorderAttributeValues.Field())
    product_variant_preorder_deactivate = ProductVariantPreorderDeactivate.Field()

    variant_media_assign = VariantMediaAssign.Field()
    variant_media_unassign = VariantMediaUnassign.Field()
   
    update_category_search_vector = UpdateCategorySearchVector.Field()






