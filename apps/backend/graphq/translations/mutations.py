import graphene
from graph.accounts.types import UserNode
from graph.blog.types import CommentNode, PostCategoryNode, PostNode
from graphene import relay
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_relay import from_global_id

from blog.models import Category, Comment, Post, PostView
from graphene_django_jwt.decorators import login_required


class AttributeTranslate(BaseTranslateMutation):
    class Input:
        id = graphene.ID(
            required=True,
            description="Attribute ID or AttributeTranslatableContent ID.",
        )
        language_code = graphene.Argument(
            LanguageCodeEnum, required=True, description="Translation language code."
        )
        input = NameTranslationInput(required=True)

    class Meta:
        description = "Creates/updates translations for an attribute."
        model = attribute_models.Attribute
        object_type = Attribute
        error_type_class = TranslationError
        error_type_field = "translation_errors"
        permissions = (SitePermissions.MANAGE_TRANSLATIONS,)


class AttributeValueTranslationInput(NameTranslationInput):
    rich_text = JSONString(description="Translated text." + RICH_CONTENT)
    plain_text = graphene.String(description="Translated text.")


class AttributeValueTranslate(BaseTranslateMutation):
    class Input:
        id = graphene.ID(
            required=True,
            description="AttributeValue ID or AttributeValueTranslatableContent ID.",
        )
        language_code = graphene.Argument(
            LanguageCodeEnum, required=True, description="Translation language code."
        )
        input = AttributeValueTranslationInput(required=True)

    class Meta:
        description = "Creates/updates translations for an attribute value."
        model = attribute_models.AttributeValue
        object_type = AttributeValue
        error_type_class = TranslationError
        error_type_field = "translation_errors"
        permissions = (SitePermissions.MANAGE_TRANSLATIONS,)

    @classmethod
    def pre_update_or_create(cls, instance, input_data):
        if "name" not in input_data.keys() or input_data["name"] is None:
            if instance.attribute.input_type == AttributeInputType.RICH_TEXT:
                input_data["name"] = truncatechars(
                    clean_editor_js(input_data["rich_text"], to_string=True), 100
                )
            elif instance.attribute.input_type == AttributeInputType.PLAIN_TEXT:
                input_data["name"] = truncatechars(input_data["plain_text"], 100)
        return input_data


class CategoryTranslate(BaseTranslateMutation):
    class Input:
        id = graphene.ID(
            required=True,
            description="Category ID or CategoryTranslatableContent ID.",
        )
        language_code = graphene.Argument(
            LanguageCodeEnum, required=True, description="Translation language code."
        )
        input = TranslationInput(required=True)

    class Meta:
        description = "Creates/updates translations for a category."
        model = product_models.Category
        object_type = Category
        error_type_class = TranslationError
        error_type_field = "translation_errors"
        permissions = (SitePermissions.MANAGE_TRANSLATIONS,)


class CollectionTranslate(BaseTranslateMutation):
    class Input:
        id = graphene.ID(
            required=True,
            description="Collection ID or CollectionTranslatableContent ID.",
        )
        language_code = graphene.Argument(
            LanguageCodeEnum, required=True, description="Translation language code."
        )
        input = TranslationInput(required=True)

    class Meta:
        description = "Creates/updates translations for a collection."
        model = product_models.Collection
        object_type = Collection
        error_type_class = TranslationError
        error_type_field = "translation_errors"
        permissions = (SitePermissions.MANAGE_TRANSLATIONS,)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        response = super().perform_mutation(
            root, info, id=id, input=input, language_code=language_code
        )
        instance = ChannelContext(node=response.collection, channel_slug=None)
        return cls(**{cls._meta.return_field_name: instance})


class MenuItemTranslate(BaseTranslateMutation):
    class Input:
        id = graphene.ID(
            required=True, description="MenuItem ID or MenuItemTranslatableContent ID."
        )
        language_code = graphene.Argument(
            LanguageCodeEnum, required=True, description="Translation language code."
        )
        input = NameTranslationInput(required=True)

    class Meta:
        description = "Creates/updates translations for a menu item."
        model = menu_models.MenuItem
        object_type = MenuItem
        error_type_class = TranslationError
        error_type_field = "translation_errors"
        permissions = (SitePermissions.MANAGE_TRANSLATIONS,)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        response = super().perform_mutation(
            root, info, id=id, input=input, language_code=language_code
        )
        instance = ChannelContext(node=response.menuItem, channel_slug=None)
        return cls(**{cls._meta.return_field_name: instance})


class PageTranslationInput(SeoTranslationInput):
    title = graphene.String()
    content = JSONString(description="Translated page content." + RICH_CONTENT)


class PageTranslate(BaseTranslateMutation):
    class Input:
        id = graphene.ID(
            required=True, description="Page ID or PageTranslatableContent ID."
        )
        language_code = graphene.Argument(
            LanguageCodeEnum, required=True, description="Translation language code."
        )
        input = PageTranslationInput(required=True)

    class Meta:
        description = "Creates/updates translations for a page."
        model = page_models.Page
        # Note: `PageTranslate` is only mutation that returns "TranslatableContent"
        object_type = translation_types.PageTranslatableContent
        error_type_class = TranslationError
        error_type_field = "translation_errors"
        permissions = (SitePermissions.MANAGE_TRANSLATIONS,)


class ProductTranslate(BaseTranslateMutation):
    class Input:
        id = graphene.ID(
            required=True,
            description="Product ID or ProductTranslatableContent ID.",
        )
        language_code = graphene.Argument(
            LanguageCodeEnum, required=True, description="Translation language code."
        )
        input = TranslationInput(required=True)

    class Meta:
        description = "Creates/updates translations for a product."
        model = product_models.Product
        object_type = Product
        error_type_class = TranslationError
        error_type_field = "translation_errors"
        permissions = (SitePermissions.MANAGE_TRANSLATIONS,)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        node_id = cls.clean_node_id(id)[0]
        instance = cls.get_node_or_error(info, node_id, only_type=Product)
        cls.validate_input(input)
        manager = get_plugin_manager_promise(info.context).get()
        with traced_atomic_transaction():
            translation, created = instance.translations.update_or_create(
                language_code=language_code, defaults=input
            )
            product = ChannelContext(node=instance, channel_slug=None)
            if created:
                cls.call_event(manager.translation_created, translation)
            else:
                cls.call_event(manager.translation_updated, translation)

        return cls(**{cls._meta.return_field_name: product})


class ProductVariantTranslate(BaseTranslateMutation):
    class Input:
        id = graphene.ID(
            required=True,
            description="ProductVariant ID or ProductVariantTranslatableContent ID.",
        )
        language_code = graphene.Argument(
            LanguageCodeEnum, required=True, description="Translation language code."
        )
        input = NameTranslationInput(required=True)

    class Meta:
        description = "Creates/updates translations for a product variant."
        model = product_models.ProductVariant
        object_type = ProductVariant
        error_type_class = TranslationError
        error_type_field = "translation_errors"
        permissions = (SitePermissions.MANAGE_TRANSLATIONS,)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        node_id = cls.clean_node_id(id)[0]
        variant_pk = cls.get_global_id_or_error(node_id, only_type=ProductVariant)
        variant = product_models.ProductVariant.objects.prefetched_for_webhook().get(
            pk=variant_pk
        )
        cls.validate_input(input)
        manager = get_plugin_manager_promise(info.context).get()
        with traced_atomic_transaction():
            translation, created = variant.translations.update_or_create(
                language_code=language_code, defaults=input
            )
            variant = ChannelContext(node=variant, channel_slug=None)
        cls.call_event(manager.product_variant_updated, variant.node)

        if created:
            cls.call_event(manager.translation_created, translation)
        else:
            cls.call_event(manager.translation_updated, translation)

        return cls(**{cls._meta.return_field_name: variant})


class SaleTranslate(BaseTranslateMutation):
    class Input:
        id = graphene.ID(
            required=True, description="Sale ID or SaleTranslatableContent ID."
        )
        language_code = graphene.Argument(
            LanguageCodeEnum, required=True, description="Translation language code."
        )
        input = NameTranslationInput(required=True)

    class Meta:
        description = "Creates/updates translations for a sale."
        model = discount_models.Sale
        object_type = Sale
        error_type_class = TranslationError
        error_type_field = "translation_errors"
        permissions = (SitePermissions.MANAGE_TRANSLATIONS,)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        response = super().perform_mutation(
            root, info, id=id, input=input, language_code=language_code
        )
        instance = ChannelContext(node=response.sale, channel_slug=None)
        return cls(**{cls._meta.return_field_name: instance})


class ShippingPriceTranslationInput(NameTranslationInput):
    description = JSONString(
        description="Translated shipping method description." + RICH_CONTENT
    )


class ShippingPriceTranslate(BaseTranslateMutation):
    class Input:
        id = graphene.ID(
            required=True,
            description=(
                "ShippingMethodType ID or ShippingMethodTranslatableContent ID."
            ),
        )
        language_code = graphene.Argument(
            LanguageCodeEnum, required=True, description="Translation language code."
        )
        input = ShippingPriceTranslationInput(required=True)

    class Meta:
        description = "Creates/updates translations for a shipping method."
        model = shipping_models.ShippingMethod
        object_type = ShippingMethodType
        error_type_class = TranslationError
        error_type_field = "translation_errors"
        permissions = (SitePermissions.MANAGE_TRANSLATIONS,)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        response = super().perform_mutation(
            root, info, id=id, input=input, language_code=language_code
        )
        instance = ChannelContext(node=response.shippingMethod, channel_slug=None)
        return cls(**{cls._meta.return_field_name: instance})

    @classmethod
    def get_node_or_error(  # type: ignore[override]
        cls,
        info: ResolveInfo,
        node_id,
        *,
        field="id",
        only_type=None,
        code="not_found",
    ):
        if only_type is ShippingMethodType:
            only_type = None
        return super().get_node_or_error(
            info,
            node_id,
            field=field,
            only_type=only_type,
            qs=shipping_models.ShippingMethod.objects,
            code=code,
        )


class ShopSettingsTranslationInput(graphene.InputObjectType):
    header_text = graphene.String()
    description = graphene.String()


class ShopSettingsTranslate(BaseMutation):
    shop = graphene.Field(Shop, description="Updated shop settings.")

    class Input:
        language_code = graphene.Argument(
            LanguageCodeEnum, required=True, description="Translation language code."
        )
        input = ShopSettingsTranslationInput(
            description="Fields required to update shop settings translations.",
            required=True,
        )

    class Meta:
        description = "Creates/updates translations for shop settings."
        doc_category = DOC_CATEGORY_SHOP
        error_type_class = TranslationError
        error_type_field = "translation_errors"
        permissions = (SitePermissions.MANAGE_TRANSLATIONS,)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        site = get_site_promise(info.context).get()
        instance = site.settings
        validate_input_against_model(SiteSettings, input)
        manager = get_plugin_manager_promise(info.context).get()
        with traced_atomic_transaction():
            translation, created = instance.translations.update_or_create(
                language_code=language_code, defaults=input
            )

        if created:
            cls.call_event(manager.translation_created, translation)
        else:
            cls.call_event(manager.translation_updated, translation)

        return ShopSettingsTranslate(shop=Shop())


class VoucherTranslate(BaseTranslateMutation):
    class Input:
        id = graphene.ID(
            required=True, description="Voucher ID or VoucherTranslatableContent ID."
        )
        language_code = graphene.Argument(
            LanguageCodeEnum, required=True, description="Translation language code."
        )
        input = NameTranslationInput(required=True)

    class Meta:
        description = "Creates/updates translations for a voucher."
        model = discount_models.Voucher
        object_type = Voucher
        error_type_class = TranslationError
        error_type_field = "translation_errors"
        permissions = (SitePermissions.MANAGE_TRANSLATIONS,)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        response = super().perform_mutation(
            root, info, id=id, input=input, language_code=language_code
        )
        instance = ChannelContext(node=response.voucher, channel_slug=None)
        return cls(**{cls._meta.return_field_name: instance})
