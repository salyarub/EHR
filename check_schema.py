import sqlite3

conn = sqlite3.connect('backend/db.sqlite3')
cursor = conn.cursor()

try:
    cursor.execute("PRAGMA table_info(patients_patient);")
    columns = cursor.fetchall()
    print("Columns in patients_patient:")
    for col in columns:
        print(col)
except Exception as e:
    print(e)
