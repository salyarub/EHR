from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Prescription
from .serializers import PrescriptionSerializer


class PrescriptionViewSet(viewsets.ModelViewSet):
    """ViewSet for Prescription CRUD operations"""
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = Prescription.objects.all().order_by('-issue_date')
        
        # Filter by patient
        patient_id = self.request.query_params.get('patient', None)
        if patient_id:
            queryset = queryset.filter(patient_id=patient_id)
        
        # Filter by status
        is_filled = self.request.query_params.get('is_filled', None)
        if is_filled is not None:
            queryset = queryset.filter(is_filled=is_filled.lower() == 'true')
        
        return queryset
