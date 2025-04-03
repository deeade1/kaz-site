from django.contrib.auth import get_user_model
from graphql import GraphQLError
from graphql_relay import from_global_id

User = get_user_model()

def validate_user_permissions(user, permission):
    if not user or not user.is_authenticated or not user.has_perm(permission):
        raise GraphQLError("Permission denied.")

def get_object_by_global_id(model, global_id):
    try:
        return model.objects.get(pk=from_global_id(global_id)[1])
    except model.DoesNotExist:
        raise GraphQLError(f"{model.__name__} not found.")

def update_object_fields(obj, fields, input_data):
    for field in fields:
        if field in input_data:
            setattr(obj, field, input_data[field])
    obj.save()