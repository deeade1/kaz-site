# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-03-17 09:36
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    operations = [
        migrations.CreateModel(
            name="ConversionRate",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "to_currency",
                    models.CharField(
                        choices=[
                            ("COP", "Colombian Peso"),
                            ("MYR", "Malaysian Ringgit"),
                            ("TMT", "Turkmenistani Manat"),
                            ("DZD", "Algerian Dinar"),
                            ("NAD", "Namibian Dollar"),
                            ("GHS", "Ghanaian Cedi"),
                            ("SZL", "Swazi Lilangeni"),
                            ("EGP", "Egyptian Pound"),
                            ("IDR", "Indonesian Rupiah"),
                            ("HNL", "Honduran Lempira"),
                            ("BGN", "Bulgarian Lev"),
                            ("FJD", "Fijian Dollar"),
                            ("ETB", "Ethiopian Birr"),
                            ("XCD", "East Caribbean Dollar"),
                            ("PAB", "Panamanian Balboa"),
                            ("BZD", "Belize Dollar"),
                            ("USD", "United States Dollar"),
                            ("ILS", "Israeli New Sheqel"),
                            ("MGA", "Malagasy Ariary"),
                            ("BOB", "Bolivian Boliviano"),
                            ("DKK", "Danish Krone"),
                            ("BWP", "Botswanan Pula"),
                            ("LBP", "Lebanese Pound"),
                            ("TZS", "Tanzanian Shilling"),
                            ("VND", "Vietnamese Dong"),
                            ("GGP", "Guernsey Pound"),
                            ("AOA", "Angolan Kwanza"),
                            ("WST", "Samoan Tala"),
                            ("KHR", "Cambodian Riel"),
                            ("MUR", "Mauritian Rupee"),
                            ("SOS", "Somali Shilling"),
                            ("KYD", "Cayman Islands Dollar"),
                            ("LYD", "Libyan Dinar"),
                            ("UAH", "Ukrainian Hryvnia"),
                            ("UGX", "Ugandan Shilling"),
                            ("JOD", "Jordanian Dinar"),
                            ("ZMW", "Zambian Kwacha"),
                            ("AWG", "Aruban Florin"),
                            ("SAR", "Saudi Riyal"),
                            ("EUR", "Euro"),
                            ("SEK", "Swedish Krona"),
                            ("TOP", "Tongan Pa\u02bbanga"),
                            ("HKD", "Hong Kong Dollar"),
                            ("JEP", "Jersey Pound"),
                            ("MDL", "Moldovan Le"),
                            ("AUD", "Australian Dollar"),
                            ("CHF", "Swiss Franc"),
                            ("CUP", "Cuban Peso"),
                            ("CLF", "Chilean Unit of Account (UF)"),
                            ("BBD", "Barbadian Dollar"),
                            ("BYR", "Belarusian Ruble"),
                            ("CDF", "Congolese Franc"),
                            ("GMD", "Gambian Dalasi"),
                            ("VEF", "Venezuelan Bol\xedvar Fuerte"),
                            ("BSD", "Bahamian Dollar"),
                            ("ARS", "Argentine Peso"),
                            ("TND", "Tunisian Dinar"),
                            ("HRK", "Croatian Kuna"),
                            ("DJF", "Djiboutian Franc"),
                            ("YER", "Yemeni Rial"),
                            ("SYP", "Syrian Pound"),
                            ("CLP", "Chilean Peso"),
                            ("THB", "Thai Baht"),
                            ("XAF", "CFA Franc BEAC"),
                            ("BND", "Brunei Dollar"),
                            ("ISK", "Icelandic Kr\xf3na"),
                            ("ALL", "Albanian Lek"),
                            ("SRD", "Surinamese Dollar"),
                            ("NIO", "Nicaraguan C\xf3rdoba"),
                            ("KZT", "Kazakhstani Tenge"),
                            ("LAK", "Laotian Kip"),
                            ("RUB", "Russian Ruble"),
                            ("XAG", "Silver (troy ounce)"),
                            ("NOK", "Norwegian Krone"),
                            ("PYG", "Paraguayan Guarani"),
                            ("PEN", "Peruvian Nuevo Sol"),
                            ("RON", "Romanian Le"),
                            ("OMR", "Omani Rial"),
                            ("BRL", "Brazilian Real"),
                            ("MAD", "Moroccan Dirham"),
                            ("MMK", "Myanma Kyat"),
                            ("PLN", "Polish Zloty"),
                            ("MZN", "Mozambican Metical"),
                            ("PHP", "Philippine Peso"),
                            ("KES", "Kenyan Shilling"),
                            ("SVC", "Salvadoran Col\xf3n"),
                            ("NPR", "Nepalese Rupee"),
                            ("STD", "S\xe3o Tom\xe9 and Pr\xedncipe Dobra"),
                            ("MKD", "Macedonian Denar"),
                            ("ZWL", "Zimbabwean Dollar"),
                            ("GBP", "British Pound Sterling"),
                            ("AZN", "Azerbaijani Manat"),
                            ("NGN", "Nigerian Naira"),
                            ("MVR", "Maldivian Rufiyaa"),
                            ("VUV", "Vanuatu Vat"),
                            ("CRC", "Costa Rican Col\xf3n"),
                            ("GNF", "Guinean Franc"),
                            ("AED", "United Arab Emirates Dirham"),
                            ("EEK", "Estonian Kroon"),
                            ("MWK", "Malawian Kwacha"),
                            ("IQD", "Iraqi Dinar"),
                            ("ERN", "Eritrean Nakfa"),
                            ("BAM", "Bosnia-Herzegovina Convertible Mark"),
                            ("LKR", "Sri Lankan Rupee"),
                            ("DOP", "Dominican Peso"),
                            ("TTD", "Trinidad and Tobago Dollar"),
                            ("CAD", "Canadian Dollar"),
                            ("PKR", "Pakistani Rupee"),
                            ("MXN", "Mexican Peso"),
                            ("HUF", "Hungarian Forint"),
                            ("CVE", "Cape Verdean Escudo"),
                            ("KWD", "Kuwaiti Dinar"),
                            ("BMD", "Bermudan Dollar"),
                            ("BIF", "Burundian Franc"),
                            ("LSL", "Lesotho Loti"),
                            ("GIP", "Gibraltar Pound"),
                            ("MNT", "Mongolian Tugrik"),
                            ("AMD", "Armenian Dram"),
                            ("UZS", "Uzbekistan Som"),
                            ("LTL", "Lithuanian Litas"),
                            ("SDG", "Sudanese Pound"),
                            ("QAR", "Qatari Rial"),
                            ("XDR", "Special Drawing Rights"),
                            ("KRW", "South Korean Won"),
                            ("TWD", "New Taiwan Dollar"),
                            ("SGD", "Singapore Dollar"),
                            ("JMD", "Jamaican Dollar"),
                            ("GEL", "Georgian Lari"),
                            ("SHP", "Saint Helena Pound"),
                            ("AFN", "Afghan Afghani"),
                            ("XA", "Gold (troy ounce)"),
                            ("SBD", "Solomon Islands Dollar"),
                            ("KPW", "North Korean Won"),
                            ("IRR", "Iranian Rial"),
                            ("SCR", "Seychellois Rupee"),
                            ("CNY", "Chinese Yuan"),
                            ("KMF", "Comorian Franc"),
                            ("BDT", "Bangladeshi Taka"),
                            ("XOF", "CFA Franc BCEAO"),
                            ("GYD", "Guyanaese Dollar"),
                            ("MTL", "Maltese Lira"),
                            ("NZD", "New Zealand Dollar"),
                            ("FKP", "Falkland Islands Pound"),
                            ("LVL", "Latvian Lats"),
                            ("TRY", "Turkish Lira"),
                            ("XPF", "CFP Franc"),
                            ("IMP", "Manx pound"),
                            ("HTG", "Haitian Gourde"),
                            ("SLL", "Sierra Leonean Leone"),
                            ("KGS", "Kyrgystani Som"),
                            ("ANG", "Netherlands Antillean Guilder"),
                            ("UY", "Uruguayan Peso"),
                            ("LRD", "Liberian Dollar"),
                            ("RWF", "Rwandan Franc"),
                            ("GTQ", "Guatemalan Quetzal"),
                            ("RSD", "Serbian Dinar"),
                            ("ZAR", "South African Rand"),
                            ("MOP", "Macanese Pataca"),
                            ("BHD", "Bahraini Dinar"),
                            ("INR", "Indian Rupee"),
                            ("JPY", "Japanese Yen"),
                            ("CZK", "Czech Republic Koruna"),
                            ("TJS", "Tajikistani Somoni"),
                            ("MRO", "Mauritanian Ouguiya"),
                            ("PGK", "Papua New Guinean Kina"),
                            ("BTC", "Bitcoin"),
                            ("BTN", "Bhutanese Ngultrum"),
                        ],
                        db_index=True,
                        max_length=3,
                        unique=True,
                        verbose_name="To",
                    ),
                ),
                (
                    "rate",
                    models.DecimalField(
                        decimal_places=5, max_digits=12, verbose_name="Conversion rate"
                    ),
                ),
                ("modified_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "ordering": ["to_currency"],
            },
        ),
    ]
