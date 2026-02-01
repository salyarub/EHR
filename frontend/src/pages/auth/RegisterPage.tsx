import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, ArrowLeft, Stethoscope, Pill, FlaskConical, UserCog } from 'lucide-react';
import { authAPI } from '../../api/auth';

const roles = [
    { id: 'DOCTOR', icon: Stethoscope, labelAr: 'طبيب', labelEn: 'Doctor', descAr: 'تسجيل كطبيب', descEn: 'Register as doctor' },
    { id: 'PHARMACIST', icon: Pill, labelAr: 'صيدلاني', labelEn: 'Pharmacist', descAr: 'تسجيل كصيدلاني', descEn: 'Register as pharmacist' },
    { id: 'LAB_TECH', icon: FlaskConical, labelAr: 'فني مختبر', labelEn: 'Lab Tech', descAr: 'تسجيل كفني', descEn: 'Register as lab tech' },
    { id: 'ADMIN', icon: UserCog, labelAr: 'مدير', labelEn: 'Admin', descAr: 'تسجيل كمدير', descEn: 'Register as admin' },
];

const RegisterPage = () => {
    const { lang } = useLanguage();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Form state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('DOCTOR');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!firstName.trim()) {
            setError(lang === 'ar' ? 'الرجاء إدخال الاسم الأول' : 'Please enter first name');
            return;
        }
        if (!lastName.trim()) {
            setError(lang === 'ar' ? 'الرجاء إدخال اسم العائلة' : 'Please enter last name');
            return;
        }
        if (!email.trim()) {
            setError(lang === 'ar' ? 'الرجاء إدخال البريد الإلكتروني' : 'Please enter email');
            return;
        }
        if (password.length < 6) {
            setError(lang === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
            return;
        }
        if (password !== confirmPassword) {
            setError(lang === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Create username from email
            const username = email.split('@')[0];

            console.log('Registering with:', {
                username,
                email,
                first_name: firstName,
                last_name: lastName,
                role: selectedRole,
            });

            await authAPI.register({
                username: username,
                email: email.trim(),
                password: password,
                password2: confirmPassword,
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                role: selectedRole,
            });

            console.log('Registration successful!');
            setSuccess(true);

            // Wait a moment then navigate to login
            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (err: any) {
            console.error('Registration error:', err.response?.data);
            const errorData = err.response?.data;
            if (errorData) {
                if (errorData.password) {
                    setError(Array.isArray(errorData.password) ? errorData.password[0] : errorData.password);
                } else if (errorData.email) {
                    setError(Array.isArray(errorData.email) ? errorData.email[0] : errorData.email);
                } else if (errorData.username) {
                    setError(Array.isArray(errorData.username) ? errorData.username[0] : errorData.username);
                } else if (errorData.role) {
                    setError(Array.isArray(errorData.role) ? errorData.role[0] : errorData.role);
                } else if (errorData.message) {
                    setError(errorData.message);
                } else if (errorData.detail) {
                    setError(errorData.detail);
                } else {
                    setError(JSON.stringify(errorData));
                }
            } else {
                setError(lang === 'ar' ? 'فشل التسجيل' : 'Registration failed');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

    if (success) {
        return (
            <div className="space-y-6 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {lang === 'ar' ? 'تم التسجيل بنجاح!' : 'Registration Successful!'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    {lang === 'ar' ? 'جاري تحويلك لصفحة تسجيل الدخول...' : 'Redirecting to login page...'}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center lg:text-start">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {lang === 'ar' ? 'إنشاء حساب' : 'Create Account'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    {lang === 'ar' ? 'انضم لشبكة الصحة الوطنية' : 'Join the National Health Network'}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Error Message */}
                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {lang === 'ar' ? 'الاسم الأول' : 'First Name'}
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-gray-400">
                                <User className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full ps-12 pe-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-white"
                                placeholder={lang === 'ar' ? 'الاسم الأول' : 'First name'}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {lang === 'ar' ? 'اسم العائلة' : 'Last Name'}
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-gray-400">
                                <User className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full ps-12 pe-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-white"
                                placeholder={lang === 'ar' ? 'اسم العائلة' : 'Last name'}
                            />
                        </div>
                    </div>
                </div>

                {/* Email Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-gray-400">
                            <Mail className="w-5 h-5" />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full ps-12 pe-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-white"
                            placeholder="user@example.com"
                            dir="ltr"
                        />
                    </div>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {lang === 'ar' ? 'كلمة المرور' : 'Password'}
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-gray-400">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full ps-12 pe-12 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-white"
                                placeholder="******"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 end-0 flex items-center pe-4 text-gray-400"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {lang === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-gray-400">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full ps-12 pe-12 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-white"
                                placeholder="******"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 end-0 flex items-center pe-4 text-gray-400"
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Role Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        {lang === 'ar' ? 'اختر الدور' : 'Select Role'}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {roles.map((role) => {
                            const Icon = role.icon;
                            const isSelected = selectedRole === role.id;
                            return (
                                <button
                                    key={role.id}
                                    type="button"
                                    onClick={() => setSelectedRole(role.id)}
                                    className={`p-4 rounded-xl border-2 transition-all text-start ${isSelected
                                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30'
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300'
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${isSelected
                                        ? 'bg-teal-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
                                        }`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <p className={`font-medium text-sm ${isSelected ? 'text-teal-700 dark:text-teal-300' : 'text-gray-900 dark:text-white'}`}>
                                        {lang === 'ar' ? role.labelAr : role.labelEn}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        {lang === 'ar' ? role.descAr : role.descEn}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-semibold shadow-lg shadow-teal-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>{lang === 'ar' ? 'جاري التسجيل...' : 'Registering...'}</span>
                        </>
                    ) : (
                        <>
                            <span>{lang === 'ar' ? 'إنشاء حساب' : 'Create Account'}</span>
                            <ArrowIcon className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-gray-600 dark:text-gray-400">
                {lang === 'ar' ? 'لديك حساب؟' : 'Already have an account?'}{' '}
                <Link to="/login" className="text-teal-600 hover:text-teal-700 dark:text-teal-400 font-semibold">
                    {lang === 'ar' ? 'سجل دخول' : 'Sign In'}
                </Link>
            </p>
        </div>
    );
};

export default RegisterPage;
