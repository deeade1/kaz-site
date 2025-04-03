import graphene
from graphene import ObjectType, Schema

# import uvicorn
from graphene_django.debug import DjangoDebug

from graphq.accounts.mutations import AccountMutations
from graphq.accounts.schema import AccountQueries
from graphq.attribute.schema import AttributeQueries
from graphq.attribute.mutations import AttributeMutations
from graphq.blog.mutations import BlogMutations
from graphq.blog.schema import BlogQueries
from graphq.channel.schema import ChannelQueries
from graphq.channel.mutations import ChannelMutations
from graphq.checkout.schema import CheckoutQueries
from graphq.checkout.mutations import CheckoutMutations
from graphq.discount.schema import DiscountQueries
from graphq.discount.mutations import DiscountMutations
from graphq.giftcard.schema import GiftCardQueries
from graphq.giftcard.mutations import GiftCardMutations
from graphq.invoice.schema import InvoiceQuery
from graphq.invoice.mutations import InvoiceMutations
from graphq.logistics.mutations import LogisticsMutation
from graphq.logistics.schema import LogisticsQueries
from graphq.logistics.subscriptions import LogisticsSubscriptions
from graphq.menu.schema import MenuQueries
from graphq.menu.mutations import MenuMutations
from graphq.order.schema import OrderQueries
from graphq.order.mutations import OrderMutations 
from graphq.page.schema import PageQueries
from graphq.page.mutations import PageMutations
from graphq.payment.schema import PaymentQueries
from graphq.payment.mutations import PaymentMutations
from graphq.plugins.schema import PluginsQueries
from graphq.plugins.mutations import PluginsMutations
from graphq.product.schema import ProductQueries
from graphq.product.mutations import ProductMutations
from graphq.shipping.schema import ShippingQueries
from graphq.shipping.mutations import ShippingMutations
from graphq.shop.schema import ShopQueries
from graphq.shop.mutations import ShopMutations
from graphq.tax.schema import TaxQueries
from graphq.tax.mutations import TaxMutations
from graphq.realestate.mutations import RealestateMutations
from graphq.realestate.schema import RealestateQueries
from graphq.realestate.subscriptions import RealestateSubscriptions
from graphq.taxi.mutations import TripMutations
from graphq.taxi.schema import TripQueries
from graphq.taxi.subscriptions import SharedTripSubscription, TripSubscription
from graphq.warehouse.schema import WarehouseQueries
from graphq.warehouse.mutations import WarehouseMutations

# from bareasgi import Application
# from bareasgi_graphql_next.graphene import add_graphene


class Query(
    AccountQueries,
    BlogQueries,
    TripQueries,
    LogisticsQueries,
    RealestateQueries,
    # AppQueries,
    AttributeQueries,
    ChannelQueries,
    CheckoutQueries,
    CoreQueries,
    CsvQueries,
    DiscountQueries,
    PluginsQueries,
    GiftCardQueries,
    MenuQueries,
    OrderQueries,
    PageQueries,
    PaymentQueries,
    ProductQueries,
    ShippingQueries,
    ShopQueries,
    StockQueries,
    TaxQueries,
    TranslationQueries,
    WarehouseQueries,
    # WebhookQueries,
):
    pass


class Mutation(
    AccountMutations,
    BlogMutations,
    TripMutations,
    LogisticsMutation,
    RealestateMutations,
    ProductMutations,
):
    pass


class Subscription(
    TripSubscription,
    SharedTripSubscription,
    LogisticsSubscriptions,
    RealestateSubscriptions,
):
    pass
    debug = graphene.Field(DjangoDebug, name="_debug")


schema = graphene.Schema(
    query=Query,
    mutation=Mutation,
    subscription=Subscription,
)

# app = Application()
# add_graphene(app, schema)

# uvicorn.run(app, port=9009)
