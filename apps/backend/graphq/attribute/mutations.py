import graphene
from django.core.exceptions import ValidationError
from graphene import relay
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_relay import from_global_id

from attribute import models
from attribute.error_codes import AttributeErrorCode

#from ..core.utils import slugify, unidecode, validate_slug_and_generate_if_needed
from django.utils.text import slugify
from text_unidecode import unidecode
#from ..permission.product_types import ProductTypePermissions
from graphq.attribute.types import (
    AttributeValueNode,
    AttributeNode
)
# --- AttributeValue Mutations ---
class CreateAttributeValue(relay.ClientIDMutation):
    class Input:
        attribute_value_data = AttributeValueInput(required=True)

    attribute_value = graphene.Field(AttributeValueNode)
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, attribute_value_data):
        user = info.context.user
        if not user.has_perm('attribute.add_attributevalue'):
            raise GraphQLError('Permission denied')
        
        # Convert global ID to database ID
        attribute_id = attribute_value_data.pop('attribute_id')
        _, attr_pk = relay.Node.from_global_id(attribute_id)
        attribute_value_data['attribute_id'] = attr_pk
        
        attribute_value = AttributeValue.objects.create(**attribute_value_data)
        return CreateAttributeValue(attribute_value=attribute_value)

class UpdateAttributeValue(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        attribute_value_data = AttributeValueInput(required=True)

    attribute_value = graphene.Field(AttributeValueNode)
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, id, attribute_value_data):
        user = info.context.user
        if not user.has_perm('attribute.change_attributevalue'):
            raise GraphQLError('Permission denied')
        
        _, pk = relay.Node.from_global_id(id)
        attribute_value = AttributeValue.objects.get(pk=pk)
        
        # Handle attribute relation if provided
        if 'attribute_id' in attribute_value_data:
            attr_id = attribute_value_data.pop('attribute_id')
            _, attr_pk = relay.Node.from_global_id(attr_id)
            attribute_value_data['attribute_id'] = attr_pk
        
        for field, value in attribute_value_data.items():
            setattr(attribute_value, field, value)
        attribute_value.save()
        
        return UpdateAttributeValue(attribute_value=attribute_value)

class DeleteAttributeValue(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)

    success = graphene.Boolean()
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, id):
        user = info.context.user
        if not user.has_perm('attribute.delete_attributevalue'):
            raise GraphQLError('Permission denied')
        
        _, pk = relay.Node.from_global_id(id)
        attribute_value = AttributeValue.objects.get(pk=pk)
        attribute_value.delete()
        
        return DeleteAttributeValue(success=True)

# --- Page Attribute Assignments ---
class AssignAttributeToPage(relay.ClientIDMutation):
    class Input:
        page_id = graphene.ID(required=True)
        attribute_value_id = graphene.ID(required=True)

    assignment = graphene.Field(AssignedPageAttributeValueNode)
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, page_id, attribute_value_id):
        user = info.context.user
        if not user.has_perm('attribute.add_assignedpageattributevalue'):
            raise GraphQLError('Permission denied')
        
        _, page_pk = relay.Node.from_global_id(page_id)
        _, value_pk = relay.Node.from_global_id(attribute_value_id)
        
        assignment = AssignedPageAttributeValue.objects.create(
            page_id=page_pk,
            value_id=value_pk
        )
        
        return AssignAttributeToPage(assignment=assignment)

class UnassignAttributeFromPage(relay.ClientIDMutation):
    class Input:
        assignment_id = graphene.ID(required=True)

    success = graphene.Boolean()
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, assignment_id):
        user = info.context.user
        if not user.has_perm('attribute.delete_assignedpageattributevalue'):
            raise GraphQLError('Permission denied')
        
        _, pk = relay.Node.from_global_id(assignment_id)
        assignment = AssignedPageAttributeValue.objects.get(pk=pk)
        assignment.delete()
        
        return UnassignAttributeFromPage(success=True)

# --- Product Attribute Assignments ---
class AssignAttributeToProduct(relay.ClientIDMutation):
    class Input:
        product_id = graphene.ID(required=True)
        attribute_value_id = graphene.ID(required=True)

    assignment = graphene.Field(AssignedProductAttributeValueNode)
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, product_id, attribute_value_id):
        user = info.context.user
        if not user.has_perm('attribute.add_assignedproductattributevalue'):
            raise GraphQLError('Permission denied')
        
        _, product_pk = relay.Node.from_global_id(product_id)
        _, value_pk = relay.Node.from_global_id(attribute_value_id)
        
        assignment = AssignedProductAttributeValue.objects.create(
            product_id=product_pk,
            value_id=value_pk
        )
        
        return AssignAttributeToProduct(assignment=assignment)

# ... similar UnassignAttributeFromProduct mutation

# --- Variant Attribute Assignments ---
class AssignAttributeToVariant(relay.ClientIDMutation):
    class Input:
        variant_id = graphene.ID(required=True)
        attribute_id = graphene.ID(required=True)
        values = graphene.List(graphene.ID)

    assignment = graphene.Field(AssignedVariantAttributeNode)
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, variant_id, attribute_id, values=None):
        user = info.context.user
        if not user.has_perm('attribute.add_assignedvariantattribute'):
            raise GraphQLError('Permission denied')
        
        # Convert global IDs to database IDs
        _, variant_pk = relay.Node.from_global_id(variant_id)
        _, attr_pk = relay.Node.from_global_id(attribute_id)
        
        # Get or create the attribute variant assignment
        attribute_variant = AttributeVariant.objects.get(
            attribute_id=attr_pk,
            product_type_id=ProductVariant.objects.get(pk=variant_pk).product.product_type_id
        )
        
        assignment = AssignedVariantAttribute.objects.create(
            variant_id=variant_pk,
            assignment=attribute_variant
        )
        
        # Assign values if provided
        if values:
            value_ids = [relay.Node.from_global_id(v)[1] for v in values]
            assignment.values.add(*value_ids)
        
        return AssignAttributeToVariant(assignment=assignment)

class UpdateVariantAttributeAssignment(relay.ClientIDMutation):
    class Input:
        assignment_id = graphene.ID(required=True)
        values = graphene.List(graphene.ID, required=True)

    assignment = graphene.Field(AssignedVariantAttributeNode)
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, assignment_id, values):
        user = info.context.user
        if not user.has_perm('attribute.change_assignedvariantattribute'):
            raise GraphQLError('Permission denied')
        
        _, pk = relay.Node.from_global_id(assignment_id)
        assignment = AssignedVariantAttribute.objects.get(pk=pk)
        
        # Clear existing values and set new ones
        value_ids = [relay.Node.from_global_id(v)[1] for v in values]
        assignment.values.clear()
        assignment.values.add(*value_ids)
        
        return UpdateVariantAttributeAssignment(assignment=assignment)

# --- AttributePage Mutations ---
class AssignAttributeToPageType(relay.ClientIDMutation):
    class Input:
        attribute_id = graphene.ID(required=True)
        page_type_id = graphene.ID(required=True)

    attribute_page = graphene.Field(AttributePageNode)
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, attribute_id, page_type_id):
        user = info.context.user
        if not user.has_perm('attribute.add_attributepage'):
            raise GraphQLError('Permission denied')
        
        _, attr_pk = relay.Node.from_global_id(attribute_id)
        _, pt_pk = relay.Node.from_global_id(page_type_id)
        
        attribute_page = AttributePage.objects.create(
            attribute_id=attr_pk,
            page_type_id=pt_pk
        )
        
        return AssignAttributeToPageType(attribute_page=attribute_page)

# --- AttributeVariant Mutations ---
class CreateAttributeVariant(relay.ClientIDMutation):
    class Input:
        attribute_id = graphene.ID(required=True)
        product_type_id = graphene.ID(required=True)
        variant_selection = graphene.Boolean()

    attribute_variant = graphene.Field(AttributeVariantNode)
    
    @classmethod
    def mutate_and_get_payload(cls, root, info, attribute_id, product_type_id, variant_selection=False):
        user = info.context.user
        if not user.has_perm('attribute.add_attributevariant'):
            raise GraphQLError('Permission denied')
        
        _, attr_pk = relay.Node.from_global_id(attribute_id)
        _, pt_pk = relay.Node.from_global_id(product_type_id)
        
        attribute_variant = AttributeVariant.objects.create(
            attribute_id=attr_pk,
            product_type_id=pt_pk,
            variant_selection=variant_selection
        )
        
        return CreateAttributeVariant(attribute_variant=attribute_variant)

# --- Update Mutation ---
class Mutation(graphene.ObjectType):
    # Attribute mutations
    create_attribute = CreateAttribute.Field()
    update_attribute = UpdateAttribute.Field()
    delete_attribute = DeleteAttribute.Field()
    
    # AttributeValue mutations
    create_attribute_value = CreateAttributeValue.Field()
    update_attribute_value = UpdateAttributeValue.Field()
    delete_attribute_value = DeleteAttributeValue.Field()
    
    # Page assignments
    assign_attribute_to_page = AssignAttributeToPage.Field()
    unassign_attribute_from_page = UnassignAttributeFromPage.Field()
    assign_attribute_to_page_type = AssignAttributeToPageType.Field()
    
    # Product assignments
    assign_attribute_to_product = AssignAttributeToProduct.Field()
    assign_attribute_to_product_type = AssignAttributeToProductType.Field()
    
    # Variant assignments
    assign_attribute_to_variant = AssignAttributeToVariant.Field()
    update_variant_attribute_assignment = UpdateVariantAttributeAssignment.Field()
    create_attribute_variant = CreateAttributeVariant.Field()
    

mutation {
  createAttribute(input: {
    attributeData: {
      slug: "color",
      name: "Color",
      type: "PRODUCT_TYPE",
      inputType: "DROPDOWN"
    }
  }) {
    attribute {
      id
      name
    }
  }
}
mutation {
  assignAttributeToProduct(input: {
    productId: "UHJvZHVjdDox",
    attributeValueId: "QXR0cmlidXRlVmFsdWU6MQ=="
  }) {
    assignment {
      id
      value {
        name
      }
    }
  }
}
mutation {
  updateVariantAttributeAssignment(input: {
    assignmentId: "QXNzaWduZWRWYXJpYW50QXR0cmlidXRlOjE=",
    values: ["QXR0cmlidXRlVmFsdWU6MQ==", "QXR0cmlidXRlVmFsdWU6Mg=="]
  }) {
    assignment {
      id
      values {
        edges {
          node {
            name
          }
        }
      }
    }
  }
}