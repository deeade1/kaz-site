from graphql import GraphQLError

def get_user_roles(user, app_name=None):
    """
    Get active roles for a user, optionally filtered by application
    """
    if not user.is_authenticated:
        return []
    
    qs = user.app_roles.filter(is_active=True)
    if app_name:
        qs = qs.filter(app_name=app_name)
    return qs

def has_app_role(user, app_name, role_name=None):
    """
    Check if user has a specific role in an application
    """
    roles = get_user_roles(user, app_name)
    if role_name:
        return roles.filter(role__name=role_name).exists()
    return roles.exists()

def validate_app_role(info, app_name, role_name=None):
    """
    GraphQL resolver helper for role validation
    """
    user = info.context.user
    if not has_app_role(user, app_name, role_name):
        raise GraphQLError(f"Permission denied - requires {role_name or 'any'} role in {app_name}")
    return user

# Backward compatibility helpers
def is_driver(user):
    return has_app_role(user, 'taxi', 'driver')

def is_rider(user):
    return has_app_role(user, 'taxi', 'rider')