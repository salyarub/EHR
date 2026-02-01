import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

# Create or Update Admin
try:
    admin = User.objects.get(email='admin@ehr.iq')
    admin.set_password('admin123')
    admin.save()
    print("Admin password updated.")
except User.DoesNotExist:
    User.objects.create_superuser(username='admin', email='admin@ehr.iq', password='admin123', first_name='Admin', last_name='User', role='ADMIN')
    print("Admin user created.")

# Verify
u = User.objects.get(email='admin@ehr.iq')
print(f"User: {u.email}, Check password: {u.check_password('admin123')}")
