import { Outlet } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Globe, Moon, Sun, Activity, Shield } from 'lucide-react';

const AuthLayout = () => {
    const { lang, toggleLanguage, t } = useLanguage();
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding (Hidden on Mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-600 via-blue-600 to-indigo-700 dark:from-teal-800 dark:via-blue-900 dark:to-indigo-950 relative overflow-hidden">
                {/* Animated Background Shapes */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
                    {/* Logo */}
                    <div className="mb-8">
                        <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl border border-white/20">
                            <Activity className="w-12 h-12 text-white" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-bold text-center mb-4">
                        {t('app_name')}
                    </h1>
                    <p className="text-xl text-white/80 text-center mb-8 max-w-md">
                        {t('app_tagline')}
                    </p>

                    {/* Features List */}
                    <div className="space-y-4 max-w-sm">
                        <FeatureItem icon="🏥" text={lang === 'ar' ? 'إدارة سجلات المرضى' : 'Patient Records Management'} />
                        <FeatureItem icon="💊" text={lang === 'ar' ? 'الوصفات الإلكترونية' : 'Electronic Prescriptions'} />
                        <FeatureItem icon="🔬" text={lang === 'ar' ? 'نتائج المختبر الفورية' : 'Instant Lab Results'} />
                        <FeatureItem icon="📊" text={lang === 'ar' ? 'التقارير والإحصائيات' : 'Reports & Analytics'} />
                    </div>

                    {/* Security Badge */}
                    <div className="mt-12 flex items-center gap-2 text-sm text-white/70">
                        <Shield className="w-4 h-4" />
                        <span>{t('secure_connection')}</span>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 bg-gray-50 dark:bg-gray-900 flex flex-col min-h-screen relative">
                {/* Top Bar */}
                <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto flex items-center gap-2 z-20">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                    >
                        <Globe className="w-4 h-4" />
                        <span className="text-sm font-medium">{lang === 'en' ? 'العربية' : 'English'}</span>
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                    >
                        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                </div>

                {/* Mobile Logo (Visible only on mobile) */}
                <div className="lg:hidden flex flex-col items-center pt-16 pb-8 bg-gradient-to-b from-teal-600 to-blue-600 dark:from-teal-800 dark:to-blue-900">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-xl border border-white/20 mb-4">
                        <Activity className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">{t('app_name')}</h1>
                </div>

                {/* Form Container */}
                <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                    <div className="w-full max-w-md">
                        <Outlet />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    © 2026 {t('ministry_name')}
                </div>
            </div>
        </div>
    );
};

const FeatureItem = ({ icon, text }: { icon: string; text: string }) => (
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
        <span className="text-2xl">{icon}</span>
        <span className="text-white/90">{text}</span>
    </div>
);

export default AuthLayout;
