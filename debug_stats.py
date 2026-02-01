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
        token = json.loads(resp_body)['access']
        print("Login successful.")

    # 2. Get Stats
    print("\nFetching Dashboard Stats...")
    req = urllib.request.Request(
        f'{base_url}/dashboard/stats/',
        headers={
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }
    )
    
    with urllib.request.urlopen(req) as response:
        print(f"Status: {response.status}")
        print(response.read().decode('utf-8'))

except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code}")
    print(e.read().decode('utf-8'))
except Exception as e:
    print(f"Error: {e}")
