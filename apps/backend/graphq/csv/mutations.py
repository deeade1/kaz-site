class CsvMutations(graphene.ObjectType):
    export_products = ExportProducts.Field()
    export_gift_cards = ExportGiftCards.Field()
