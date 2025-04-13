# ALLOCATION MUTATIONS

class AllocationInput(graphene.InputObjectType):
    order_line_id = graphene.ID(required=True, description="ID of the order line.")
    stock_id = graphene.ID(required=True, description="ID of the stock.")
    quantity_allocated = graphene.Int(
        required=True, 
        description="Quantity to allocate."
    )

class AllocationCreate(relay.ClientIDMutation):
    allocation = graphene.Field(AllocationType, description="The created allocation.")
    
    class Input:
        input = AllocationInput(required=True)
    
    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, input):
        try:
            order_line = graphene.Node.get_node_from_global_id(
                info, input["order_line_id"], only_type="OrderLine"
            )
            stock = graphene.Node.get_node_from_global_id(
                info, input["stock_id"], only_type="Stock"
            )
            
            allocation = models.Allocation.objects.create(
                order_line=order_line,
                stock=stock,
                quantity_allocated=input["quantity_allocated"],
            )
            return AllocationCreate(allocation=allocation)
        except Exception as e:
            raise GraphQLError(str(e))

class AllocationUpdate(relay.ClientIDMutation):
    allocation = graphene.Field(AllocationType, description="The updated allocation.")
    
    class Input:
        id = graphene.ID(required=True, description="ID of the allocation to update.")
        quantity_allocated = graphene.Int(
            required=True, 
            description="New allocated quantity."
        )
    
    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            allocation = graphene.Node.get_node_from_global_id(
                info, input["id"], only_type="Allocation"
            )
            allocation.quantity_allocated = input["quantity_allocated"]
            allocation.save()
            return AllocationUpdate(allocation=allocation)
        except Exception as e:
            raise GraphQLError(str(e))

class AllocationDelete(relay.ClientIDMutation):
    success = graphene.Boolean(description="Whether the deletion was successful.")
    
    class Input:
        id = graphene.ID(required=True, description="ID of the allocation to delete.")
    
    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            allocation = graphene.Node.get_node_from_global_id(
                info, input["id"], only_type="Allocation"
            )
            allocation.delete()
            return AllocationDelete(success=True)
        except Exception as e:
            raise GraphQLError(str(e))


# PREORDER ALLOCATION MUTATIONS

class PreorderAllocationInput(graphene.InputObjectType):
    order_line_id = graphene.ID(required=True, description="ID of the order line.")
    product_variant_channel_listing_id = graphene.ID(
        required=True, 
        description="ID of the product variant channel listing."
    )
    quantity = graphene.Int(required=True, description="Quantity to allocate.")

class PreorderAllocationCreate(relay.ClientIDMutation):
    preorder_allocation = graphene.Field(
        PreorderAllocationType, 
        description="The created preorder allocation."
    )
    
    class Input:
        input = PreorderAllocationInput(required=True)
    
    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, input):
        try:
            order_line = graphene.Node.get_node_from_global_id(
                info, input["order_line_id"], only_type="OrderLine"
            )
            listing = graphene.Node.get_node_from_global_id(
                info, 
                input["product_variant_channel_listing_id"],
                only_type="ProductVariantChannelListing"
            )
            
            preorder_allocation = models.PreorderAllocation.objects.create(
                order_line=order_line,
                product_variant_channel_listing=listing,
                quantity=input["quantity"],
            )
            return PreorderAllocationCreate(preorder_allocation=preorder_allocation)
        except Exception as e:
            raise GraphQLError(str(e))

class PreorderAllocationUpdate(relay.ClientIDMutation):
    preorder_allocation = graphene.Field(
        PreorderAllocationType, 
        description="The updated preorder allocation."
    )
    
    class Input:
        id = graphene.ID(required=True, description="ID of the preorder allocation.")
        quantity = graphene.Int(required=True, description="New quantity.")
    
    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            preorder_allocation = graphene.Node.get_node_from_global_id(
                info, input["id"], only_type="PreorderAllocation"
            )
            preorder_allocation.quantity = input["quantity"]
            preorder_allocation.save()
            return PreorderAllocationUpdate(preorder_allocation=preorder_allocation)
        except Exception as e:
            raise GraphQLError(str(e))

class PreorderAllocationDelete(relay.ClientIDMutation):
    success = graphene.Boolean(description="Whether the deletion was successful.")
    
    class Input:
        id = graphene.ID(required=True, description="ID of the preorder allocation.")
    
    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            preorder_allocation = graphene.Node.get_node_from_global_id(
                info, input["id"], only_type="PreorderAllocation"
            )
            preorder_allocation.delete()
            return PreorderAllocationDelete(success=True)
        except Exception as e:
            raise GraphQLError(str(e))


# RESERVATION MUTATIONS

class ReservationInput(graphene.InputObjectType):
    checkout_line_id = graphene.ID(required=True, description="ID of the checkout line.")
    stock_id = graphene.ID(required=True, description="ID of the stock.")
    quantity_reserved = graphene.Int(required=True, description="Quantity to reserve.")
    reserved_until = graphene.DateTime(
        required=True, 
        description="Until when the reservation is valid."
    )

class ReservationCreate(relay.ClientIDMutation):
    reservation = graphene.Field(ReservationType, description="The created reservation.")
    
    class Input:
        input = ReservationInput(required=True)
    
    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, input):
        try:
            checkout_line = graphene.Node.get_node_from_global_id(
                info, input["checkout_line_id"], only_type="CheckoutLine"
            )
            stock = graphene.Node.get_node_from_global_id(
                info, input["stock_id"], only_type="Stock"
            )
            
            reservation = models.Reservation.objects.create(
                checkout_line=checkout_line,
                stock=stock,
                quantity_reserved=input["quantity_reserved"],
                reserved_until=input["reserved_until"],
            )
            return ReservationCreate(reservation=reservation)
        except Exception as e:
            raise GraphQLError(str(e))

class ReservationUpdate(relay.ClientIDMutation):
    reservation = graphene.Field(ReservationType, description="The updated reservation.")
    
    class Input:
        id = graphene.ID(required=True, description="ID of the reservation.")
        quantity_reserved = graphene.Int(
            required=False, 
            description="New reserved quantity."
        )
        reserved_until = graphene.DateTime(
            required=False, 
            description="New reservation end time."
        )
    
    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            reservation = graphene.Node.get_node_from_global_id(
                info, input["id"], only_type="Reservation"
            )
            if "quantity_reserved" in input:
                reservation.quantity_reserved = input["quantity_reserved"]
            if "reserved_until" in input:
                reservation.reserved_until = input["reserved_until"]
            reservation.save()
            return ReservationUpdate(reservation=reservation)
        except Exception as e:
            raise GraphQLError(str(e))

class ReservationDelete(relay.ClientIDMutation):
    success = graphene.Boolean(description="Whether the deletion was successful.")
    
    class Input:
        id = graphene.ID(required=True, description="ID of the reservation.")
    
    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            reservation = graphene.Node.get_node_from_global_id(
                info, input["id"], only_type="Reservation"
            )
            reservation.delete()
            return ReservationDelete(success=True)
        except Exception as e:
            raise GraphQLError(str(e))


# PREORDER RESERVATION MUTATIONS

class PreorderReservationInput(graphene.InputObjectType):
    checkout_line_id = graphene.ID(required=True, description="ID of the checkout line.")
    product_variant_channel_listing_id = graphene.ID(
        required=True, 
        description="ID of the product variant channel listing."
    )
    quantity_reserved = graphene.Int(required=True, description="Quantity to reserve.")
    reserved_until = graphene.DateTime(
        required=True, 
        description="Until when the reservation is valid."
    )

class PreorderReservationCreate(relay.ClientIDMutation):
    preorder_reservation = graphene.Field(
        PreorderReservationType, 
        description="The created preorder reservation."
    )
    
    class Input:
        input = PreorderReservationInput(required=True)
    
    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, input):
        try:
            checkout_line = graphene.Node.get_node_from_global_id(
                info, input["checkout_line_id"], only_type="CheckoutLine"
            )
            listing = graphene.Node.get_node_from_global_id(
                info, 
                input["product_variant_channel_listing_id"],
                only_type="ProductVariantChannelListing"
            )
            
            preorder_reservation = models.PreorderReservation.objects.create(
                checkout_line=checkout_line,
                product_variant_channel_listing=listing,
                quantity_reserved=input["quantity_reserved"],
                reserved_until=input["reserved_until"],
            )
            return PreorderReservationCreate(preorder_reservation=preorder_reservation)
        except Exception as e:
            raise GraphQLError(str(e))

class PreorderReservationUpdate(relay.ClientIDMutation):
    preorder_reservation = graphene.Field(
        PreorderReservationType, 
        description="The updated preorder reservation."
    )
    
    class Input:
        id = graphene.ID(required=True, description="ID of the preorder reservation.")
        quantity_reserved = graphene.Int(
            required=False, 
            description="New reserved quantity."
        )
        reserved_until = graphene.DateTime(
            required=False, 
            description="New reservation end time."
        )
    
    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            preorder_reservation = graphene.Node.get_node_from_global_id(
                info, input["id"], only_type="PreorderReservation"
            )
            if "quantity_reserved" in input:
                preorder_reservation.quantity_reserved = input["quantity_reserved"]
            if "reserved_until" in input:
                preorder_reservation.reserved_until = input["reserved_until"]
            preorder_reservation.save()
            return PreorderReservationUpdate(preorder_reservation=preorder_reservation)
        except Exception as e:
            raise GraphQLError(str(e))

class PreorderReservationDelete(relay.ClientIDMutation):
    success = graphene.Boolean(description="Whether the deletion was successful.")
    
    class Input:
        id = graphene.ID(required=True, description="ID of the preorder reservation.")
    
    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            preorder_reservation = graphene.Node.get_node_from_global_id(
                info, input["id"], only_type="PreorderReservation"
            )
            preorder_reservation.delete()
            return PreorderReservationDelete(success=True)
        except Exception as e:
            raise GraphQLError(str(e))


# CHANNEL WAREHOUSE MUTATIONS

class ChannelWarehouseInput(graphene.InputObjectType):
    channel_id = graphene.ID(required=True, description="ID of the channel.")
    warehouse_id = graphene.ID(required=True, description="ID of the warehouse.")
    sort_order = graphene.Int(required=False, description="Sort order position.")

class ChannelWarehouseCreate(relay.ClientIDMutation):
    channel_warehouse = graphene.Field(
        ChannelWarehouseType, 
        description="The created channel warehouse relation."
    )
    
    class Input:
        input = ChannelWarehouseInput(required=True)
    
    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, input):
        try:
            channel = graphene.Node.get_node_from_global_id(
                info, input["channel_id"], only_type="Channel"
            )
            warehouse = graphene.Node.get_node_from_global_id(
                info, input["warehouse_id"], only_type="Warehouse"
            )
            
            channel_warehouse = models.ChannelWarehouse.objects.create(
                channel=channel,
                warehouse=warehouse,
                sort_order=input.get("sort_order", 0),
            )
            return ChannelWarehouseCreate(channel_warehouse=channel_warehouse)
        except Exception as e:
            raise GraphQLError(str(e))

class ChannelWarehouseUpdate(relay.ClientIDMutation):
    channel_warehouse = graphene.Field(
        ChannelWarehouseType, 
        description="The updated channel warehouse relation."
    )
    
    class Input:
        id = graphene.ID(required=True, description="ID of the relation to update.")
        sort_order = graphene.Int(required=True, description="New sort order position.")
    
    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            channel_warehouse = graphene.Node.get_node_from_global_id(
                info, input["id"], only_type="ChannelWarehouse"
            )
            channel_warehouse.sort_order = input["sort_order"]
            channel_warehouse.save()
            return ChannelWarehouseUpdate(channel_warehouse=channel_warehouse)
        except Exception as e:
            raise GraphQLError(str(e))

class ChannelWarehouseDelete(relay.ClientIDMutation):
    success = graphene.Boolean(description="Whether the deletion was successful.")
    
    class Input:
        id = graphene.ID(required=True, description="ID of the relation to delete.")
    
    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **input):
        try:
            channel_warehouse = graphene.Node.get_node_from_global_id(
                info, input["id"], only_type="ChannelWarehouse"
            )
            channel_warehouse.delete()
            return ChannelWarehouseDelete(success=True)
        except Exception as e:
            raise GraphQLError(str(e))


# MUTATION COLLECTIONS

class AllocationMutations(graphene.ObjectType):
    create_allocation = AllocationCreate.Field()
    update_allocation = AllocationUpdate.Field()
    delete_allocation = AllocationDelete.Field()

class PreorderAllocationMutations(graphene.ObjectType):
    create_preorder_allocation = PreorderAllocationCreate.Field()
    update_preorder_allocation = PreorderAllocationUpdate.Field()
    delete_preorder_allocation = PreorderAllocationDelete.Field()

class ReservationMutations(graphene.ObjectType):
    create_reservation = ReservationCreate.Field()
    update_reservation = ReservationUpdate.Field()
    delete_reservation = ReservationDelete.Field()

class PreorderReservationMutations(graphene.ObjectType):
    create_preorder_reservation = PreorderReservationCreate.Field()
    update_preorder_reservation = PreorderReservationUpdate.Field()
    delete_preorder_reservation = PreorderReservationDelete.Field()

class ChannelWarehouseMutations(graphene.ObjectType):
    create_channel_warehouse = ChannelWarehouseCreate.Field()
    update_channel_warehouse = ChannelWarehouseUpdate.Field()
    delete_channel_warehouse = ChannelWarehouseDelete.Field()