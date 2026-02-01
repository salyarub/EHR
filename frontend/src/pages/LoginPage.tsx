import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe, Eye, EyeOff, Shield, Activity } from 'lucide-react';

const LoginPage = () => {
    const { i18n } = useTranslation();
    const [isDark, setIsDark] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });

    useEffect(() => {
        document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        console.log('Login attempt:', formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 flex flex-col items-center justify-center p-4 transition-all duration-500">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Top Controls */}
            <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto flex items-center gap-2 z-10">
                <button
                    onClick={toggleLanguage}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all duration-300 border border-white/10"
                >
                    <Globe className="h-5 w-5" />
                </button>
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all duration-300 border border-white/10"
                >
                    {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-md relative z-10">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 mb-4">
                        <Activity className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {i18n.language === 'ar' ? 'نظام السجلات الصحية' : 'Iraq National EHR'}
                    </h1>
                    <p className="text-blue-200/80">
                        {i18n.language === 'ar' ? 'نظام السجلات الصحية الإلكترونية الوطني' : 'Centralized Electronic Health Records'}
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
                    <div className="flex items-center gap-2 text-sm text-blue-200/70 mb-6 justify-center">
                        <Shield className="h-4 w-4" />
                        <span>{i18n.language === 'ar' ? 'اتصال آمن ومشفر' : 'Secure & Encrypted Connection'}</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username Field */}
                        <div>
                            <label className="block text-sm font-medium text-blue-100 mb-2">
                                {i18n.language === 'ar' ? 'اسم المستخدم' : 'Username'}
                            </label>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                placeholder={i18n.language === 'ar' ? 'أدخل اسم المستخدم' : 'Enter your username'}
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-blue-100 mb-2">
                                {i18n.language === 'ar' ? 'كلمة المرور' : 'Password'}
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pr-12 rtl:pr-4 rtl:pl-12"
                                    placeholder={i18n.language === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 -translate-y-1/2 text-blue-200/70 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-blue-100 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500" />
                                <span>{i18n.language === 'ar' ? 'تذكرني' : 'Remember me'}</span>
                            </label>
                            <a href="#" className="text-blue-300 hover:text-white transition-colors">
                                {i18n.language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>{i18n.language === 'ar' ? 'جاري الدخول...' : 'Signing in...'}</span>
                                </>
                            ) : (
                                <span>{i18n.language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-blue-200/50 text-sm mt-6">
                    {i18n.language === 'ar' ? '© 2026 وزارة الصحة العراقية' : '© 2026 Iraq Ministry of Health'}
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
