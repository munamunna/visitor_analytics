from django.contrib import admin
from .models import Alert,Floor,Section,ReportType

# Register your models here.
admin.site.register(Alert)
admin.site.register(Floor)
admin.site.register(Section)
admin.site.register(ReportType)


