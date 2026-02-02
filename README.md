# National EHR System (Electronic Health Record)

This project is a modern, full-stack Electronic Health Record (EHR) system designed to manage patients, doctors, and prescriptions efficiently. It features a robust Django backend and a responsive React frontend.

## 🚀 Features Implemented

### 1. Authentication & Security
- **Custom User Model**: Role-based users (Admin, Doctor, Patient, Pharmacist).
- **JWT Authentication**: Secure login using JSON Web Tokens.
- **Email Login**: Users log in with their email address instead of a username.
- **Registration**: Doctors and staff can register with role selection.
- **Validation**: Comprehensive input validation using `Zod` (frontend) and Django Validators (backend).

### 2. Patient Management
- **Add Patient**: Detailed form with validation for National ID, DOB, Gender, and Contact Info.
- **Edit Patient**: Ability to update existing patient details.
- **Delete Patient**: Secure removal of patient records.
- **Duplicate Prevention**: Checks for existing National IDs or Emails to prevent duplicate entries.
- **Recent Patients**: Displays the most recently added patients on the dashboard.

### 3. Dashboard
- **Statistics**: Real-time counters for Total Patients, Appointments, Pending Prescriptions, etc.
- **Interactive UI**: Quick actions and recent activity feed.
- **Responsive Design**: Fully functional on desktop and mobile devices.

### 4. Localization (i18n)
- **Bilingual Support**: Full support for **Arabic (RTL)** and **English (LTR)**.
- **Context API**: Dynamic language switching without page reload.

---

## 🛠 Tools & Technologies

### Backend (Django)
- **Django Framework**: The core web framework used for its security and scalability.
- **Django REST Framework (DRF)**: For building the RESTful API endpoints.
- **Simple JWT**: For handling JSON Web Token authentication.
- **SQLite**: Default database (can be easily switched to PostgreSQL).
- **Cors Headers**: To allow communication between the React frontend and Django backend.

### Frontend (React)
- **React + Vite**: Fast, modern frontend library and build tool.
- **TypeScript**: For type safety and better developer experience.
- **Tailwind CSS**: Utility-first CSS framework for custom, responsive styling.
- **React Hook Form**: Efficient form handling.
- **Zod**: Schema validation for forms.
- **Axios**: HTTP client for making API requests.
- **Lucide React**: Modern icon set.

---

## 📂 Project Structure & File Explanation

### Backend (`/backend`)

#### `config/`
- **`settings.py`**: Main configuration (Installed apps, Database, CORS, Middleware).
- **`urls.py`**: Main URL router, forwards requests to specific apps (`core`, `patients`, etc.).

#### `core/` (App)
- **`models.py`**: Defines the custom `User` model and roles.
- **`views.py`**: Handles Login, Register, and Profile API requests.
- **`serializers.py`**: Converts User data to/from JSON.

#### `patients/` (App)
- **`models.py`**: Defines `Patient` and `MedicalRecord` models.
- **`views.py`**:
    - `PatientViewSet`: Handles CRUD (Create, Read, Update, Delete) for patients.
    - `DashboardStatsView`: Calculates stats for the dashboard cards.
- **`serializers.py`**: Validates and serializes patient data.

### Frontend (`/frontend`)

#### `src/api/`
- **`client.ts`**: Axios instance configuration (Base URL, Interceptors).
- **`auth.ts`**: API functions for Login/Register.
- **`patients.ts`**: API functions for Patient CRUD operations (`getAll`, `create`, `update`, `delete`).
- **`dashboard.ts`**: API function to fetch stats.

#### `src/contexts/`
- **`LanguageContext.tsx`**: Manages the app's language state (Ar/En) and provides the translation function `t()`.

#### `src/components/patients/`
- **`AddPatientModal.tsx`**: A reusable modal component for **Adding** and **Editing** patients. It handles form state, validation, and API calls.

#### `src/pages/`
- **`auth/LoginPage.tsx`**: User login interface with error handling.
- **`dashboard/DashboardPage.tsx`**: The main landing page. Displays stats cards and the list of recent patients. Contains logic for opening the Edit/Delete modals.

---

## ⚙️ How to Run

### Prerequisities
- Python 3.8+
- Node.js & npm

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
*Server runs at: `http://localhost:8000`*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*App runs at: `http://localhost:5173`*

---

## 📝 Recent Work Log
1.  **Fixed Authentication**: Switched to Email-based login.
2.  **Database Reset**: Cleared conflicts and regenerated migrations for a clean schema.
3.  **Dashboard Fixes**: Resolved API errors preventing stats and patient lists from loading.
4.  **Edit/Delete Feature**: Added full CRUD capabilities for patients.
5.  **UX Improvements**:
    - specific error messages for duplicate IDs/Emails.
    - Auto-reset forms when opening modals.
