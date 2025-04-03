from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from phonenumbers.phonenumberutil import country_code_for_region

from .i18n import AddressMetaForm, get_address_form_class
from .models import User

# from phonenumber_field.formfields import PhoneNumberField
# from django_otp.forms import OTPAuthenticationFormMixin


def get_address_form(
    data, country_code, initial=None, instance=None, enable_normalization=True, **kwargs
):
    country_form = AddressMetaForm(data, initial=initial)
    if country_form.is_valid():
        country_code = country_form.cleaned_data["country"]

    if initial is None and country_code:
        initial = {}
    if country_code:
        initial["phone"] = "+{}".format(country_code_for_region(country_code))
    address_form_class = get_address_form_class(country_code)

    if instance is not None:
        address_form = address_form_class(
            data, instance=instance, enable_normalization=enable_normalization, **kwargs
        )
    else:
        initial_address = initial
        address_form = address_form_class(
            data or None,
            initial=initial_address,
            enable_normalization=enable_normalization,
            **kwargs,
        )

    if hasattr(address_form.fields["country_area"], "choices"):
        choices = address_form.fields["country_area"].choices
        choices = [(choice[1], choice[1]) for choice in choices]
        address_form.fields["country_area"].choices = choices
    return address_form


class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = User
        fields = ("email",)


class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = User
        fields = ("email",)
