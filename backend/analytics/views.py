from django.shortcuts import render
from .models import Alert, Floor, ReportType
from django.utils.dateparse import parse_date
from datetime import datetime, time, timedelta
from django.db.models import Sum, Max
from django.db.models.functions import TruncDate, ExtractHour
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated


def get_filtered_alerts(request):
    queryset = Alert.objects.all()

    # Date range filtering
    start = request.GET.get('start')
    end = request.GET.get('end')
    if start and end:
        try:
            start_date = datetime.combine(parse_date(start), time.min)
            end_date = datetime.combine(parse_date(end), time.max)
        except Exception:
            return Alert.objects.none()
    else:
        today = datetime.today().date()
        start_date = datetime.combine(today - timedelta(days=6), time.min)
        end_date = datetime.combine(today, time.max)

    queryset = queryset.filter(alert_time__range=(start_date, end_date))

    # Floor filtering
    floor_name = request.GET.get('floor_name')
    if floor_name:
        queryset = queryset.filter(floor__name__iexact=floor_name)

    # Report type filtering (single or multiple)
    report_types = request.GET.getlist('report_type')
    if report_types:
        queryset = queryset.filter(report_types__name__in=report_types).distinct()

    return queryset

#  1. Total Visitor Count
class TotalVisitorsView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        alerts = get_filtered_alerts(request)
        total = alerts.aggregate(total=Sum('incount'))['total'] or 0
        return Response({"total_visitor_count": total})
#  2. Busiest Day
class BusiestDayView(APIView):
    def get(self, request):
        alerts = get_filtered_alerts(request)
        data = (
            alerts.annotate(day=TruncDate('alert_time'))
            .values('day')
            .annotate(total=Sum('incount'))
            .order_by('-total')
            .first()
        )
        return Response({
            'busiest_day': data['day'] if data else None,
            'total_visitors': data['total'] if data else 0
        })

class BusiestHourView(APIView):
    def get(self, request):
        alerts = get_filtered_alerts(request)
        data = (
            alerts.annotate(hour=ExtractHour('alert_time'))
            .values('hour')
            .annotate(total=Sum('incount'))
            .order_by('-total')
            .first()
        )

        if data:
            hour_24 = data['hour']
            # Convert to 12-hour format with AM/PM
            hour_display = datetime.strptime(str(hour_24), "%H").strftime("%I %p")
        else:
            hour_display = None

        return Response({
            'busiest_hour': hour_display,
            'total_visitors': data['total'] if data else 0
        })

class BusiestSectionView(APIView):
    def get(self, request):
        alerts = get_filtered_alerts(request)

        section = (
            alerts.values('section__name')
            .annotate(max_occ=Max('occupancy'))
            .order_by('-max_occ')
            .first()
        )

        return Response({
            'busiest_section': section['section__name'] if section else None,
            'occupancy': section['max_occ'] if section else 0
        })

class DailyTrendView(APIView):
    def get(self, request):
        alerts = get_filtered_alerts(request)

        data = (
            alerts.annotate(day=TruncDate('alert_time'))
            .values('day')
            .annotate(total=Sum('incount'))
            .order_by('day')
        )

        trend = {entry['day'].strftime('%Y-%m-%d'): entry['total'] for entry in data}

        return Response({'daily_trend': trend})

class ReportTypeListView(APIView):
    def get(self, request):
        types = ReportType.objects.values_list('name', flat=True)
        return Response({"report_types": list(types)})

class FloorListView(APIView):
    def get(self, request):
        floors = Floor.objects.values_list('name', flat=True)
        return Response({"floors": list(floors)})
