// Comprehensive translations dictionary for the National EHR System
// Supports Arabic (ar) and English (en)

export const translations = {
    en: {
        // App
        app_name: "Iraq National EHR",
        app_tagline: "Centralized Electronic Health Records System",
        ministry_name: "Iraq Ministry of Health",

        // Auth - Common
        secure_connection: "Secure & Encrypted Connection",
        remember_me: "Remember me",
        forgot_password: "Forgot password?",
        or_continue_with: "Or continue with",
        already_have_account: "Already have an account?",
        dont_have_account: "Don't have an account?",
        terms_agreement: "By signing up, you agree to our Terms of Service and Privacy Policy",

        // Login
        login_title: "Welcome Back",
        login_subtitle: "Sign in to access your dashboard",
        email_label: "Email Address",
        email_placeholder: "doctor@health.gov.iq",
        password_label: "Password",
        password_placeholder: "Enter your password",
        login_btn: "Sign In",
        logging_in: "Signing in...",

        // Register
        register_title: "Create Account",
        register_subtitle: "Join the National Health Network",
        fullname_label: "Full Name",
        fullname_placeholder: "Dr. Ahmed Ali",
        confirm_password_label: "Confirm Password",
        confirm_password_placeholder: "Re-enter your password",
        select_role: "Select Your Role",
        register_btn: "Create Account",
        registering: "Creating account...",

        // Roles
        role_doctor: "Doctor",
        role_doctor_desc: "Physician access to patient records",
        role_pharmacist: "Pharmacist",
        role_pharmacist_desc: "Prescription dispensing access",
        role_lab_tech: "Lab Technician",
        role_lab_tech_desc: "Laboratory results management",
        role_nurse: "Nurse",
        role_nurse_desc: "Patient care coordination",
        role_admin: "Administrator",
        role_admin_desc: "System administration",

        // Validation
        email_required: "Email is required",
        email_invalid: "Please enter a valid email address",
        password_required: "Password is required",
        password_min: "Password must be at least 8 characters",
        password_uppercase: "Password must contain an uppercase letter",
        password_number: "Password must contain a number",
        fullname_required: "Full name is required",
        fullname_min: "Name must be at least 3 characters",
        passwords_mismatch: "Passwords do not match",
        role_required: "Please select a role",

        // Dashboard
        dashboard_welcome: "Welcome back",
        dashboard_title: "Dashboard",
        dashboard_overview: "Overview",
        quick_actions: "Quick Actions",

        // Sidebar
        sidebar_dashboard: "Dashboard",
        sidebar_patients: "Patients",
        sidebar_appointments: "Appointments",
        sidebar_prescriptions: "Prescriptions",
        sidebar_lab_results: "Lab Results",
        sidebar_reports: "Reports",
        sidebar_settings: "Settings",
        sidebar_logout: "Logout",

        // Stats
        total_patients: "Total Patients",
        today_appointments: "Today's Appointments",
        pending_prescriptions: "Pending Prescriptions",
        lab_results_ready: "Lab Results Ready",

        // Actions
        new_patient: "New Patient",
        new_appointment: "New Appointment",
        new_prescription: "New Prescription",
        view_all: "View All",

        // Settings
        language: "Language",
        theme: "Theme",
        dark_mode: "Dark Mode",
        light_mode: "Light Mode",
        profile: "Profile",
        notifications: "Notifications",

        // Common
        search: "Search",
        search_placeholder: "Search patients, records...",
        loading: "Loading...",
        save: "Save",
        cancel: "Cancel",
        confirm: "Confirm",
        delete: "Delete",
        edit: "Edit",
        view: "View",
        back: "Back",
        next: "Next",
        previous: "Previous",
    },

    ar: {
        // App
        app_name: "نظام السجلات الصحية العراقي",
        app_tagline: "نظام السجلات الصحية الإلكترونية المركزي",
        ministry_name: "وزارة الصحة العراقية",

        // Auth - Common
        secure_connection: "اتصال آمن ومشفر",
        remember_me: "تذكرني",
        forgot_password: "نسيت كلمة المرور؟",
        or_continue_with: "أو تابع باستخدام",
        already_have_account: "لديك حساب بالفعل؟",
        dont_have_account: "ليس لديك حساب؟",
        terms_agreement: "بالتسجيل، أنت توافق على شروط الخدمة وسياسة الخصوصية",

        // Login
        login_title: "مرحباً بعودتك",
        login_subtitle: "سجل دخولك للوصول إلى لوحة التحكم",
        email_label: "البريد الإلكتروني",
        email_placeholder: "doctor@health.gov.iq",
        password_label: "كلمة المرور",
        password_placeholder: "أدخل كلمة المرور",
        login_btn: "تسجيل الدخول",
        logging_in: "جاري تسجيل الدخول...",

        // Register
        register_title: "إنشاء حساب",
        register_subtitle: "انضم إلى الشبكة الصحية الوطنية",
        fullname_label: "الاسم الكامل",
        fullname_placeholder: "د. أحمد علي",
        confirm_password_label: "تأكيد كلمة المرور",
        confirm_password_placeholder: "أعد إدخال كلمة المرور",
        select_role: "اختر دورك",
        register_btn: "إنشاء الحساب",
        registering: "جاري إنشاء الحساب...",

        // Roles
        role_doctor: "طبيب",
        role_doctor_desc: "الوصول إلى سجلات المرضى",
        role_pharmacist: "صيدلي",
        role_pharmacist_desc: "صرف الوصفات الطبية",
        role_lab_tech: "فني مختبر",
        role_lab_tech_desc: "إدارة نتائج المختبر",
        role_nurse: "ممرض/ة",
        role_nurse_desc: "تنسيق رعاية المرضى",
        role_admin: "مدير النظام",
        role_admin_desc: "إدارة النظام",

        // Validation
        email_required: "البريد الإلكتروني مطلوب",
        email_invalid: "يرجى إدخال بريد إلكتروني صحيح",
        password_required: "كلمة المرور مطلوبة",
        password_min: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
        password_uppercase: "كلمة المرور يجب أن تحتوي على حرف كبير",
        password_number: "كلمة المرور يجب أن تحتوي على رقم",
        fullname_required: "الاسم الكامل مطلوب",
        fullname_min: "الاسم يجب أن يكون 3 أحرف على الأقل",
        passwords_mismatch: "كلمات المرور غير متطابقة",
        role_required: "يرجى اختيار الدور",

        // Dashboard
        dashboard_welcome: "مرحباً بعودتك",
        dashboard_title: "لوحة التحكم",
        dashboard_overview: "نظرة عامة",
        quick_actions: "إجراءات سريعة",

        // Sidebar
        sidebar_dashboard: "لوحة التحكم",
        sidebar_patients: "المرضى",
        sidebar_appointments: "المواعيد",
        sidebar_prescriptions: "الوصفات الطبية",
        sidebar_lab_results: "نتائج المختبر",
        sidebar_reports: "التقارير",
        sidebar_settings: "الإعدادات",
        sidebar_logout: "تسجيل الخروج",

        // Stats
        total_patients: "إجمالي المرضى",
        today_appointments: "مواعيد اليوم",
        pending_prescriptions: "الوصفات المعلقة",
        lab_results_ready: "نتائج المختبر الجاهزة",

        // Actions
        new_patient: "مريض جديد",
        new_appointment: "موعد جديد",
        new_prescription: "وصفة جديدة",
        view_all: "عرض الكل",

        // Settings
        language: "اللغة",
        theme: "المظهر",
        dark_mode: "الوضع الداكن",
        light_mode: "الوضع الفاتح",
        profile: "الملف الشخصي",
        notifications: "الإشعارات",

        // Common
        search: "بحث",
        search_placeholder: "ابحث عن المرضى، السجلات...",
        loading: "جاري التحميل...",
        save: "حفظ",
        cancel: "إلغاء",
        confirm: "تأكيد",
        delete: "حذف",
        edit: "تعديل",
        view: "عرض",
        back: "رجوع",
        next: "التالي",
        previous: "السابق",
    }
} as const;

export type Language = 'en' | 'ar';
export type TranslationKey = keyof typeof translations.en;
