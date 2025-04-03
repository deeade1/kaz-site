class PageAttributeAssign(BaseMutation):
    page_type = graphene.Field(PageType, description="The updated page type.")

    class Arguments:
        page_type_id = graphene.ID(
            required=True,
            description="ID of the page type to assign the attributes into.",
        )
        attribute_ids = NonNullList(
            graphene.ID,
            required=True,
            description="The IDs of the attributes to assign.",
        )

    class Meta:
        doc_category = DOC_CATEGORY_PAGES
        description = "Assign attributes to a given page type."
        error_type_class = PageError
        error_type_field = "page_errors"
        permissions = (PageTypePermissions.MANAGE_PAGE_TYPES_AND_ATTRIBUTES,)

    @classmethod
    def clean_attributes(
        cls,
        errors: Dict["str", List[ValidationError]],
        page_type: "page_models.PageType",
        attr_pks: List[int],
    ):
        """Ensure the attributes are page attributes and are not already assigned."""

        # check if any attribute is not a page type
        invalid_attributes = models.Attribute.objects.filter(pk__in=attr_pks).exclude(
            type=AttributeType.PAGE_TYPE
        )

        if invalid_attributes:
            invalid_attributes_ids = [
                graphene.Node.to_global_id("Attribute", attr.pk)
                for attr in invalid_attributes
            ]
            error = ValidationError(
                "Only page attributes can be assigned.",
                code=PageErrorCode.INVALID.value,
                params={"attributes": invalid_attributes_ids},
            )
            errors["attribute_ids"].append(error)

        # check if any attribute is already assigned to this page type
        assigned_attrs = models.Attribute.objects.get_assigned_page_type_attributes(
            page_type.pk
        ).filter(pk__in=attr_pks)

        if assigned_attrs:
            assigned_attributes_ids = [
                graphene.Node.to_global_id("Attribute", attr.pk)
                for attr in assigned_attrs
            ]
            error = ValidationError(
                "Some of the attributes have been already assigned to this page type.",
                code=PageErrorCode.ATTRIBUTE_ALREADY_ASSIGNED.value,
                params={"attributes": assigned_attributes_ids},
            )
            errors["attribute_ids"].append(error)

    @classmethod
    def perform_mutation(  # type: ignore[override]
        cls, _root, info: ResolveInfo, /, *, attribute_ids, page_type_id
    ):
        errors: defaultdict[str, List[ValidationError]] = defaultdict(list)

        # retrieve the requested page type
        page_type = cls.get_node_or_error(
            info, page_type_id, only_type=PageType, field="page_type_id"
        )

        # resolve all passed attributes IDs to attributes pks
        attr_pks = cls.get_global_ids_or_error(
            attribute_ids, Attribute, field="attribute_ids"
        )

        # ensure the attributes are assignable
        cls.clean_attributes(errors, page_type, attr_pks)

        if errors:
            raise ValidationError(errors)

        page_type.page_attributes.add(*attr_pks)

        return cls(page_type=page_type)


class PageAttributeUnassign(BaseMutation):
    page_type = graphene.Field(PageType, description="The updated page type.")

    class Arguments:
        page_type_id = graphene.ID(
            required=True,
            description=(
                "ID of the page type from which the attributes should be unassign."
            ),
        )
        attribute_ids = NonNullList(
            graphene.ID,
            required=True,
            description="The IDs of the attributes to unassign.",
        )

    class Meta:
        description = "Unassign attributes from a given page type."
        doc_category = DOC_CATEGORY_PAGES
        permissions = (PageTypePermissions.MANAGE_PAGE_TYPES_AND_ATTRIBUTES,)
        error_type_class = PageError
        error_type_field = "page_errors"

    @classmethod
    def perform_mutation(cls, _root, info: ResolveInfo, /, **data):
        page_type_id = data["page_type_id"]
        attribute_ids = data["attribute_ids"]

        # retrieve the requested page type
        page_type = cls.get_node_or_error(info, page_type_id, only_type=PageType)

        # resolve all passed attributes IDs to attributes pks
        _, attr_pks = resolve_global_ids_to_primary_keys(attribute_ids, Attribute)

        page_type.page_attributes.remove(*attr_pks)

        return cls(page_type=page_type)


class PageInput(BaseInputObjectType):
    slug = graphene.String(description="Page internal name.")
    title = graphene.String(description="Page title.")
    content = JSONString(description="Page content." + RICH_CONTENT)
    attributes = NonNullList(AttributeValueInput, description="List of attributes.")
    is_published = graphene.Boolean(
        description="Determines if page is visible in the storefront."
    )
    publication_date = graphene.String(
        description=(
            f"Publication date. ISO 8601 standard. {DEPRECATED_IN_3X_INPUT} "
            "Use `publishedAt` field instead."
        )
    )
    published_at = graphene.DateTime(
        description="Publication date time. ISO 8601 standard." + ADDED_IN_33
    )
    seo = SeoInput(description="Search engine optimization fields.")

    class Meta:
        doc_category = DOC_CATEGORY_PAGES


class PageCreateInput(PageInput):
    page_type = graphene.ID(
        description="ID of the page type that page belongs to.", required=True
    )

    class Meta:
        doc_category = DOC_CATEGORY_PAGES


class PageCreate(relay.ClientIDMutation, ModelMutation):
    class Input:
        input = PageCreateInput(
            required=True, description="Fields required to create a page."
        )

    class Meta:
        description = "Creates a new page."
        model = models.Page
        object_type = Page
        permissions = (PagePermissions.MANAGE_PAGES,)
        error_type_class = PageError
        error_type_field = "page_errors"

    @classmethod
    def clean_attributes(cls, attributes: dict, page_type: models.PageType):
        attributes_qs = page_type.page_attributes.all()
        attributes = AttributeAssignmentMixin.clean_input(
            attributes, attributes_qs, is_page_attributes=True
        )
        return attributes

    @classmethod
    def clean_input(cls, info: ResolveInfo, instance, data, **kwargs):
        cleaned_input = super().clean_input(info, instance, data, **kwargs)
        try:
            cleaned_input = validate_slug_and_generate_if_needed(
                instance, "title", cleaned_input
            )
        except ValidationError as error:
            error.code = PageErrorCode.REQUIRED.value
            raise ValidationError({"slug": error})

        if "publication_date" in cleaned_input and "published_at" in cleaned_input:
            raise ValidationError(
                {
                    "publication_date": ValidationError(
                        "Only one of argument: publicationDate or publishedAt "
                        "must be specified.",
                        code=PageErrorCode.INVALID.value,
                    )
                }
            )

        is_published = cleaned_input.get("is_published")
        publication_date = cleaned_input.get("published_at") or cleaned_input.get(
            "publication_date"
        )
        if is_published and not publication_date:
            cleaned_input["published_at"] = datetime.now(pytz.UTC)
        elif "publication_date" in cleaned_input or "published_at" in cleaned_input:
            cleaned_input["published_at"] = publication_date

        attributes = cleaned_input.get("attributes")
        page_type = (
            instance.page_type if instance.pk else cleaned_input.get("page_type")
        )
        if attributes and page_type:
            try:
                cleaned_input["attributes"] = cls.clean_attributes(
                    attributes, page_type
                )
            except ValidationError as exc:
                raise ValidationError({"attributes": exc})

        clean_seo_fields(cleaned_input)

        return cleaned_input

    @classmethod
    def _save_m2m(cls, info: ResolveInfo, instance, cleaned_data):
        with traced_atomic_transaction():
            super()._save_m2m(info, instance, cleaned_data)

            attributes = cleaned_data.get("attributes")
            if attributes:
                AttributeAssignmentMixin.save(instance, attributes)

    @classmethod
    def save(cls, info: ResolveInfo, instance, cleaned_input):
        super().save(info, instance, cleaned_input)
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.page_created, instance)


class PageDelete(relay.ClientIDMutation, ModelDeleteMutation):
    class Input:
        id = graphene.ID(required=True, description="ID of a page to delete.")

    class Meta:
        description = "Deletes a page."
        model = models.Page
        object_type = Page
        permissions = (PagePermissions.MANAGE_PAGES,)
        error_type_class = PageError
        error_type_field = "page_errors"

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        page = cls.get_instance(info, **data)
        manager = get_plugin_manager_promise(info.context).get()
        with traced_atomic_transaction():
            cls.delete_assigned_attribute_values(page)
            response = super().perform_mutation(_root, info, **data)
            cls.call_event(manager.page_deleted, page)
        return response

    @staticmethod
    def delete_assigned_attribute_values(instance):
        attribute_models.AttributeValue.objects.filter(
            pageassignments__page_id=instance.id,
            attribute__input_type__in=AttributeInputType.TYPES_WITH_UNIQUE_VALUES,
        ).delete()


class PageReorderAttributeValues(
    relay.ClientIDMutation, BaseReorderAttributeValuesMutation
):
    page = graphene.Field(
        Page, description="Page from which attribute values are reordered."
    )

    class Meta:
        description = "Reorder page attribute values."
        doc_category = DOC_CATEGORY_PAGES
        permissions = (PagePermissions.MANAGE_PAGES,)
        error_type_class = PageError
        error_type_field = "page_errors"

    class Input:
        page_id = graphene.Argument(
            graphene.ID, required=True, description="ID of a page."
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
        page_id = data["page_id"]
        page = cls.perform(page_id, "page", data, "pagevalueassignment", PageErrorCode)
        return PageReorderAttributeValues(page=page)

    @classmethod
    def get_instance(cls, instance_id: str):
        pk = cls.get_global_id_or_error(instance_id, only_type=Page, field="page_id")

        try:
            page = page_models.Page.objects.prefetch_related("attributes").get(pk=pk)
        except ObjectDoesNotExist:
            raise ValidationError(
                {
                    "page_id": ValidationError(
                        (f"Couldn't resolve to a page: {instance_id}"),
                        code=PageErrorCode.NOT_FOUND.value,
                    )
                }
            )
        return page


class PageTypeCreateInput(InputObjectType):
    name = graphene.String(description="Name of the page type.")
    slug = graphene.String(description="Page type slug.")
    add_attributes = NonNullList(
        graphene.ID,
        description="List of attribute IDs to be assigned to the page type.",
    )

    class Meta:
        doc_category = DOC_CATEGORY_PAGES


class PageTypeMixin:
    @classmethod
    def validate_attributes(
        cls,
        errors: Dict[str, List[ValidationError]],
        attributes: List["Attribute"],
        field: str,
    ):
        """All attributes must be page type attribute.

        Raise an error if any of the attributes are not page attribute.
        """
        if attributes:
            not_valid_attributes = [
                graphene.Node.to_global_id("Attribute", attr.pk)
                for attr in attributes
                if attr.type != AttributeType.PAGE_TYPE
            ]
            if not_valid_attributes:
                error = ValidationError(
                    "Only page type attributes allowed.",
                    code=PageErrorCode.INVALID.value,
                    params={"attributes": not_valid_attributes},
                )
                errors[field].append(error)


class PageTypeCreate(relay.ClientIDMutation, PageTypeMixin, ModelMutation):
    class Input:
        input = PageTypeCreateInput(
            description="Fields required to create page type.", required=True
        )

    class Meta:
        description = "Create a new page type."
        model = models.PageType
        object_type = PageType
        permissions = (PageTypePermissions.MANAGE_PAGE_TYPES_AND_ATTRIBUTES,)
        error_type_class = PageError
        error_type_field = "page_errors"

    @classmethod
    def clean_input(cls, info: ResolveInfo, instance, data, **kwargs):
        cleaned_input = super().clean_input(info, instance, data, **kwargs)
        errors = defaultdict(list)
        try:
            cleaned_input = validate_slug_and_generate_if_needed(
                instance, "name", cleaned_input
            )
        except ValidationError as error:
            error.code = PageErrorCode.REQUIRED.value
            errors["slug"].append(error)

        cls.validate_attributes(
            errors, cleaned_input.get("add_attributes"), "add_attributes"
        )

        if errors:
            raise ValidationError(errors)

        return cleaned_input

    @classmethod
    def _save_m2m(cls, info: ResolveInfo, instance, cleaned_data):
        super()._save_m2m(info, instance, cleaned_data)
        attributes = cleaned_data.get("add_attributes")
        if attributes is not None:
            instance.page_attributes.add(*attributes)

    @classmethod
    def post_save_action(cls, info: ResolveInfo, instance, cleaned_input):
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.page_type_created, instance)


class PageTypeDelete(relay.ClientIDMutation, ModelDeleteMutation):
    class Input:
        id = graphene.ID(required=True, description="ID of the page type to delete.")

    class Meta:
        description = "Delete a page type."
        model = models.PageType
        object_type = PageType
        permissions = (PageTypePermissions.MANAGE_PAGE_TYPES_AND_ATTRIBUTES,)
        error_type_class = PageError
        error_type_field = "page_errors"

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        page_type_pk = cls.get_global_id_or_error(id, only_type=PageType, field="pk")
        with traced_atomic_transaction():
            cls.delete_assigned_attribute_values(page_type_pk)
            return super().perform_mutation(_root, info, id=id)

    @staticmethod
    def delete_assigned_attribute_values(instance_pk):
        attribute_models.AttributeValue.objects.filter(
            attribute__input_type__in=AttributeInputType.TYPES_WITH_UNIQUE_VALUES,
            pageassignments__assignment__page_type_id=instance_pk,
        ).delete()

    @classmethod
    def post_save_action(cls, info: ResolveInfo, instance, cleaned_input):
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.page_type_deleted, instance)


class PageTypeReorderAttributes(relay.ClientIDMutation, BaseReorderAttributesMutation):
    page_type = graphene.Field(
        PageType, description="Page type from which attributes are reordered."
    )

    class Input:
        page_type_id = graphene.Argument(
            graphene.ID, required=True, description="ID of a page type."
        )
        moves = NonNullList(
            ReorderInput,
            required=True,
            description="The list of attribute reordering operations.",
        )

    class Meta:
        description = "Reorder the attributes of a page type."
        doc_category = DOC_CATEGORY_PAGES
        permissions = (PageTypePermissions.MANAGE_PAGE_TYPES_AND_ATTRIBUTES,)
        error_type_class = PageError
        error_type_field = "page_errors"

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        page_type_id = data["page_type_id"]
        pk = cls.get_global_id_or_error(page_type_id, only_type=PageType, field="pk")

        try:
            page_type = page_models.PageType.objects.prefetch_related(
                "attributepage"
            ).get(pk=pk)
        except ObjectDoesNotExist:
            raise ValidationError(
                {
                    "page_type_id": ValidationError(
                        f"Couldn't resolve to a page type: {page_type_id}",
                        code=PageErrorCode.NOT_FOUND.value,
                    )
                }
            )

        page_attributes = page_type.attributepage.all()
        moves = data["moves"]

        try:
            operations = cls.prepare_operations(moves, page_attributes)
        except ValidationError as error:
            error.code = PageErrorCode.NOT_FOUND.value
            raise ValidationError({"moves": error})

        with traced_atomic_transaction():
            perform_reordering(page_attributes, operations)

        return PageTypeReorderAttributes(page_type=page_type)


class PageTypeUpdateInput(PageTypeCreateInput):
    remove_attributes = NonNullList(
        graphene.ID,
        description="List of attribute IDs to be assigned to the page type.",
    )

    class Meta:
        doc_category = DOC_CATEGORY_PAGES


class PageTypeUpdate(relay.ClientIDMutation, PageTypeMixin, ModelMutation):
    class Input:
        id = graphene.ID(description="ID of the page type to update.")
        input = PageTypeUpdateInput(
            description="Fields required to update page type.", required=True
        )

    class Meta:
        description = "Update page type."
        model = models.PageType
        object_type = PageType
        permissions = (PageTypePermissions.MANAGE_PAGE_TYPES_AND_ATTRIBUTES,)
        error_type_class = PageError
        error_type_field = "page_errors"

    @classmethod
    def clean_input(cls, info: ResolveInfo, instance, data, **kwargs):
        errors = defaultdict(list)
        error = check_for_duplicates(
            data, "add_attributes", "remove_attributes", "attributes"
        )
        if error:
            error.code = PageErrorCode.DUPLICATED_INPUT_ITEM.value
            errors["attributes"].append(error)

        cleaned_input = super().clean_input(info, instance, data, **kwargs)
        try:
            cleaned_input = validate_slug_and_generate_if_needed(
                instance, "name", cleaned_input
            )
        except ValidationError as error:
            error.code = PageErrorCode.REQUIRED
            errors["slug"].append(error)

        add_attributes = cleaned_input.get("add_attributes")
        cls.validate_attributes(errors, add_attributes, "add_attributes")

        remove_attributes = cleaned_input.get("remove_attributes")
        cls.validate_attributes(errors, remove_attributes, "remove_attributes")

        if errors:
            raise ValidationError(errors)

        return cleaned_input

    @classmethod
    def _save_m2m(cls, info: ResolveInfo, instance, cleaned_data):
        super()._save_m2m(info, instance, cleaned_data)
        remove_attributes = cleaned_data.get("remove_attributes")
        add_attributes = cleaned_data.get("add_attributes")
        if remove_attributes is not None:
            instance.page_attributes.remove(*remove_attributes)
        if add_attributes is not None:
            instance.page_attributes.add(*add_attributes)

    @classmethod
    def post_save_action(cls, info: ResolveInfo, instance, cleaned_input):
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.page_type_updated, instance)


class PageUpdate(relay.ClientIDMutation, PageCreate):
    class Input:
        id = graphene.ID(required=True, description="ID of a page to update.")
        input = PageInput(
            required=True, description="Fields required to update a page."
        )

    class Meta:
        description = "Updates an existing page."
        model = models.Page
        object_type = Page
        permissions = (PagePermissions.MANAGE_PAGES,)
        error_type_class = PageError
        error_type_field = "page_errors"

    @classmethod
    def clean_attributes(cls, attributes: dict, page_type: models.PageType):
        attributes_qs = page_type.page_attributes.all()
        attributes = AttributeAssignmentMixin.clean_input(
            attributes, attributes_qs, creation=False, is_page_attributes=True
        )
        return attributes

    @classmethod
    def save(cls, info: ResolveInfo, instance, cleaned_input):
        super(PageCreate, cls).save(info, instance, cleaned_input)
        manager = get_plugin_manager_promise(info.context).get()
        cls.call_event(manager.page_updated, instance)


class PageMutations(graphene.ObjectType):
    # page mutations
    page_create = PageCreate.Field()
    page_delete = PageDelete.Field()
    page_bulk_delete = PageBulkDelete.Field()
    page_bulk_publish = PageBulkPublish.Field()
    page_update = PageUpdate.Field()
    page_translate = PageTranslate.Field()

    # page type mutations
    page_type_create = PageTypeCreate.Field()
    page_type_update = PageTypeUpdate.Field()
    page_type_delete = PageTypeDelete.Field()
    page_type_bulk_delete = PageTypeBulkDelete.Field()

    # attributes mutations
    page_attribute_assign = PageAttributeAssign.Field()
    page_attribute_unassign = PageAttributeUnassign.Field()
    page_type_reorder_attributes = PageTypeReorderAttributes.Field()
    page_reorder_attribute_values = PageReorderAttributeValues.Field()
