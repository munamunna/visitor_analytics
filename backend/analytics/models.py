from django.db import models

# Create your models here.
from django.db import models

class Floor(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Section(models.Model):
    name = models.CharField(max_length=100)
    floor = models.ForeignKey(Floor, on_delete=models.CASCADE, related_name='sections')

    class Meta:
        unique_together = ('name', 'floor')  # Ensure unique section per floor

    def __str__(self):
        return f"{self.name} ({self.floor.name})"


class ReportType(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Alert(models.Model):
    alert_id = models.AutoField(primary_key=True)
    floor = models.ForeignKey(Floor, on_delete=models.CASCADE, related_name='alerts')
    section = models.ForeignKey(Section, on_delete=models.SET_NULL, null=True, blank=True, related_name='alerts')
    alert_time = models.DateTimeField()
    
    report_types = models.ManyToManyField(ReportType, related_name='alerts')  
    
    incount = models.PositiveIntegerField()
    outcount = models.PositiveIntegerField()
    occupancy = models.PositiveIntegerField()

    def __str__(self):
        return f"Alert on {self.floor.name} at {self.alert_time.strftime('%Y-%m-%d %H:%M:%S')}"

