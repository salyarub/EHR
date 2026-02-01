from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.db.models import Count
from datetime import date, timedelta
from .models import Patient, MedicalRecord
from .serializers import PatientSerializer, PatientListSerializer, MedicalRecordSerializer


class PatientViewSet(viewsets.ModelViewSet):
    """ViewSet for Patient CRUD operations"""
    queryset = Patient.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return PatientListSerializer
        return PatientSerializer
    
    def get_queryset(self):
        queryset = Patient.objects.all().order_by('-created_at')
        
        # Filter by search query
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                first_name__icontains=search
            ) | queryset.filter(
                last_name__icontains=search
            ) | queryset.filter(
                national_id__icontains=search
            )
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def recent(self, request):
        """Get recent patients (last 10)"""
        recent_patients = self.get_queryset()[:10]
        serializer = PatientListSerializer(recent_patients, many=True)
        return Response(serializer.data)


class MedicalRecordViewSet(viewsets.ModelViewSet):
    """ViewSet for MedicalRecord CRUD operations"""
    queryset = MedicalRecord.objects.all()
    serializer_class = MedicalRecordSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = MedicalRecord.objects.all().order_by('-visit_date')
        patient_id = self.request.query_params.get('patient', None)
        if patient_id:
            queryset = queryset.filter(patient_id=patient_id)
        return queryset


class DashboardStatsView(APIView):
    """API view for dashboard statistics"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        today = date.today()
        
        # Total patients
        total_patients = Patient.objects.count()
        
        # Today's appointments (using visit_date from medical records)
        today_appointments = MedicalRecord.objects.filter(visit_date=today).count()
        
        # Pending prescriptions (not filled)
        from prescriptions.models import Prescription
        pending_prescriptions = Prescription.objects.filter(is_dispensed=False).count()
        
        # Lab results ready (recent medical records with treatment)
        lab_results_ready = MedicalRecord.objects.filter(
            visit_date__gte=today - timedelta(days=7),
            treatment__isnull=False
        ).count()
        
        return Response({
            'total_patients': total_patients,
            'today_appointments': today_appointments,
            'pending_prescriptions': pending_prescriptions,
            'lab_results_ready': lab_results_ready
        })
