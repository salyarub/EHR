from rest_framework import serializers
from .models import Patient, MedicalRecord


class MedicalRecordSerializer(serializers.ModelSerializer):
    """Serializer for MedicalRecord model"""
    class Meta:
        model = MedicalRecord
        fields = ['id', 'patient', 'diagnosis', 'treatment', 'notes', 'visit_date', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class PatientSerializer(serializers.ModelSerializer):
    """Serializer for Patient model"""
    medical_records = MedicalRecordSerializer(many=True, read_only=True)
    
    class Meta:
        model = Patient
        fields = [
            'id', 'national_id', 'first_name', 'last_name', 'date_of_birth', 
            'gender', 'phone_number', 'email', 'address', 'blood_type', 
            'allergies', 'chronic_conditions', 'emergency_contact_name', 
            'emergency_contact_phone', 'created_at', 'updated_at', 'medical_records'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class PatientListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for patient lists"""
    full_name = serializers.SerializerMethodField()
    age = serializers.SerializerMethodField()
    
    class Meta:
        model = Patient
        fields = ['id', 'national_id', 'full_name', 'age', 'gender', 'phone_number', 'created_at']
    
    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    
    def get_age(self, obj):
        from datetime import date
        if obj.date_of_birth:
            today = date.today()
            return today.year - obj.date_of_birth.year - ((today.month, today.day) < (obj.date_of_birth.month, obj.date_of_birth.day))
        return None
