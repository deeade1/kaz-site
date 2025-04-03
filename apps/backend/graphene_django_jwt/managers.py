from django.db import models
from django.db.models import Case, Value as V, When
from django.utils import timezone
from graphene_django_jwt.settings import jwt_settings


class RefreshTokenQuerySet(models.QuerySet):
    def expired(self):
        """
        Annotate queryset with a boolean field `expired` indicating if the token is expired.
        """
        expires = timezone.now() - jwt_settings.GRAPHENE_DJANGO_JWT_REFRESH_EXPIRATION_DELTA
        return self.annotate(
            expired=Case(
                When(created__lt=expires, then=V(True)),
                default=V(False),
                output_field=models.BooleanField(),
            ),
        )


class RefreshToken(models.Model):
    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        verbose_name=_("user"),
        related_name="refresh_tokens",
    )
    token = models.CharField(_("token"), max_length=255, editable=False, unique=True)
    created = models.DateTimeField(_("created"), auto_now_add=True)
    revoked = models.DateTimeField(_("revoked"), null=True, blank=True)

    objects = RefreshTokenQuerySet.as_manager()

    class Meta:
        verbose_name = _("refresh token")
        verbose_name_plural = _("refresh tokens")

    def __str__(self):
        return self.token

    def save(self, *args, **kwargs):
        if not self.token:
            self.token = self.generate_token()
        super().save(*args, **kwargs)

    @classmethod
    def generate_token(cls):
        """Generate a cryptographically secure token."""
        return binascii.hexlify(os.urandom(20)).decode()

    def is_expired(self):
        """Check if the refresh token has expired."""
        return refresh_has_expired(timegm(self.created.timetuple()))

    def revoke(self):
        """Revoke the refresh token and add it to the blacklist."""
        self.revoked = timezone.now()
        self.save(update_fields=["revoked"])
        Blacklist.set(self)
        signals.refresh_token_revoked.send(sender=RefreshToken, refresh_token=self)

    def rotate(self):
        """Rotate the refresh token and optionally blacklist the old one."""
        new_refresh_token = RefreshToken.objects.create(user=self.user)
        if jwt_settings.GRAPHENE_DJANGO_JWT_INVALIDATE_REFRESH_TOKEN_ON_REFRESH:
            Blacklist.set(self)
        signals.refresh_token_rotated.send(
            sender=RefreshToken,
            refresh_token=self,
            new_refresh_token=new_refresh_token,
        )
        return new_refresh_token