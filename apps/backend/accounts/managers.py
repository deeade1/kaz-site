from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext_lazy as _




class UserManager(BaseUserManager):
    def _create_user(self, email=None, phone_number=None, password=None, **extra_fields):
        if not email and not phone_number:
            raise ValueError(_("Either email or phone_number must be set"))

        User = apps.get_model("accounts", "User")
        user = User(email=email, phone_number=phone_number, **extra_fields)

        if password:
            user.set_password(password)

        user.save(using=self._db)
        return user

    def create_user(self, email=None, phone_number=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email=email, phone_number=phone_number, password=password, **extra_fields)

    def create_superuser(self, email=None, phone_number=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if not extra_fields["is_staff"]:
            raise ValueError("Superuser must have is_staff=True.")
        if not extra_fields["is_superuser"]:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email=email, phone_number=phone_number, password=password, **extra_fields)

