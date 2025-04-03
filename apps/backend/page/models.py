from typing import TYPE_CHECKING, Union

from django.contrib.postgres.indexes import BTreeIndex, GinIndex
from django.db import models

from core.models import ModelWithMetadata, PublishableModel, PublishedQuerySet
from core.utils.editorjs import clean_editor_js
from seo.models import SeoModel, SeoModelTranslationWithSlug

if TYPE_CHECKING:
    from accounts.models import User

    # from app.models import App


class PageQueryset(PublishedQuerySet):
    def visible_to_user(self, requestor: ["User", None]):
        if requestor and requestor.has_perm(PagePermissions.MANAGE_PAGES):
            return self.all()
        return self.published()


PageManager = models.Manager.from_queryset(PageQueryset)


class Page(ModelWithMetadata, SeoModel, PublishableModel):
    slug = models.SlugField(unique=True, max_length=255)
    title = models.CharField(max_length=250)
    page_type = models.ForeignKey(
        "PageType", related_name="pages", on_delete=models.CASCADE
    )
    content = models.JSONField(blank=True, null=True, default=clean_editor_js)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    objects = PageManager()  # type: ignore[assignment,misc]

    class Meta(ModelWithMetadata.Meta):
        ordering = ("slug",)
        permissions = (("manage_pages", "Manage pages."),)
        indexes = [
            *ModelWithMetadata.Meta.indexes,  # Include inherited indexes
            # Create BTree index for `title`
            BTreeIndex(fields=["title"], name="title_btree_idx"),
            # Create BTree index for `slug`
            BTreeIndex(fields=["slug"], name="slug_btree_idx"),
        ]

    def __str__(self):
        return self.title


class PageTranslation(SeoModelTranslationWithSlug):
    page = models.ForeignKey(
        Page, related_name="translations", on_delete=models.CASCADE
    )
    title = models.CharField(max_length=255, blank=True, null=True)
    content = models.JSONField(blank=True, null=True, default=clean_editor_js)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["language_code", "slug"],
                name="uniq_lang_slug_pagetransl",
            ),
        ]
        ordering = ("language_code", "page", "pk")
        unique_together = (("language_code", "page"),)

    def __repr__(self):
        class_ = type(self)
        return f"{class_.__name__}(pk={self.pk!r}, title={self.title!r}, page_pk={self.page_id!r})"

    def __str__(self):
        return self.title if self.title else str(self.pk)

    def get_translated_object_id(self):
        return "Page", self.page_id

    def get_translated_keys(self):
        translated_keys = super().get_translated_keys()
        translated_keys.update(
            {
                "title": self.title,
                "content": self.content,
            }
        )
        return translated_keys


class PageType(ModelWithMetadata):
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=255, unique=True, allow_unicode=True)

    class Meta(ModelWithMetadata.Meta):
        ordering = ("slug",)
        permissions = (
            (
                "manage_page_types_and_attributes",
                "Manage page types and attributes.",
            ),
        )

        indexes = [
            GinIndex(
                fields=["name"],
                opclasses=["gin_trgm_ops"],
                name="pagetype_title_gin_idx",
            ),
            GinIndex(
                fields=["slug"],
                opclasses=["gin_trgm_ops"],
                name="pagetype_slug_gin_idx",
            ),
        ]
