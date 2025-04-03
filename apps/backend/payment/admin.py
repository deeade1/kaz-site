from django.contrib import admin

from .models import Payment, Transaction, TransactionEvent, TransactionItem


@admin.register(TransactionItem)
class TransactionItemAdmin(admin.ModelAdmin):
    model = TransactionItem


@admin.register(TransactionEvent)
class TransactionEventAdmin(admin.ModelAdmin):
    model = TransactionEvent


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    model = Payment


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    model = Transaction
