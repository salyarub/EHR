import urllib.request
import urllib.error
import json

base_url = 'http://localhost:8000/api'

# 1. Login
print("Logging in...")
login_data = {
    'email': 'admin@ehr.iq',
    'password': 'admin123'
}

try:
    req = urllib.request.Request(
        f'{base_url}/auth/login/',
        data=json.dumps(login_data).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(req) as response:
        resp_body = response.read().decode('utf-8')
        print(f"Login Status: {response.status}")
        token = json.loads(resp_body)['access']
        print("Login successful, got token.")

    # 2. Create Patient
    print("\nCreating Patient...")
    patient_data = {
        'national_id': '12312131341',
        'first_name': 'amjed',
        'last_name': 'alsakran',
        'date_of_birth': '2001-02-01',
        'gender': 'M',
        'email': 'hjhj@gmail.com',
        'phone_number': '0700000000',
        'address': 'Mosul',
        'blood_type': 'O+',
        'emergency_contact_name': 'Someone',
        'emergency_contact_phone': '0987987987672'
    }
    
    req = urllib.request.Request(
        f'{base_url}/patients/',
        data=json.dumps(patient_data).encode('utf-8'),
        headers={
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }
    )
    
    with urllib.request.urlopen(req) as response:
        print(f"Create Status: {response.status}")
        print(f"Response Body: {response.read().decode('utf-8')}")

except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code}")
    error_content = e.read().decode('utf-8', errors='replace')
    print("Saving error to error.html...")
    with open('error.html', 'w', encoding='utf-8') as f:
        f.write(error_content)
    # print head
    print(error_content[:500])
except Exception as e:
    print(f"Error: {e}")
