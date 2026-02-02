from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        DOCTOR = "DOCTOR", "Doctor"
        PHARMACIST = "PHARMACIST", "Pharmacist"
        LAB_TECH = "LAB_TECH", "Lab Technician"
        PATIENT = "PATIENT", "Patient"

    role = models.CharField(max_length=50, choices=Role.choices, default=Role.PATIENT)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
