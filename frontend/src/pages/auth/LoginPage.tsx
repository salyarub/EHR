import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { authAPI } from '../../api/auth';

const LoginPage = () => {
    const { lang, t } = useLanguage();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!email.trim()) {
            setError(lang === 'ar' ? 'الرجاء إدخال البريد الإلكتروني' : 'Please enter your email');
            return;
        }
        if (!password.trim()) {
            setError(lang === 'ar' ? 'الرجاء إدخال كلمة المرور' : 'Please enter your password');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            console.log('Attempting login with:', { email, password });

            const response = await authAPI.login({
                email: email.trim(),
                password: password,
            });

            console.log('Login response:', response);

            // Store tokens
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
            localStorage.setItem('user', JSON.stringify(response.user));

            // Navigate to dashboard
            navigate('/');
        } catch (err: any) {
            console.error('Login error:', err.response?.data);
            const errorData = err.response?.data;
            if (errorData?.error) {
                setError(errorData.error);
            } else if (errorData?.detail) {
                setError(errorData.detail);
            } else {
                setError(lang === 'ar' ? 'فشل تسجيل الدخول' : 'Login failed');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center lg:text-start">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('login_title')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    {t('login_subtitle')}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Error Message */}
                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {/* Email Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('email_label')}
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-gray-400">
                            <Mail className="w-5 h-5" />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full ps-12 pe-4 py-3.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400"
                            placeholder={t('email_placeholder')}
                            dir="ltr"
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('password_label')}
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-gray-400">
                            <Lock className="w-5 h-5" />
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full ps-12 pe-12 py-3.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400"
                            placeholder={t('password_placeholder')}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 end-0 flex items-center pe-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{t('remember_me')}</span>
                    </label>
                    <Link to="/forgot-password" className="text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 font-medium">
                        {t('forgot_password')}
                    </Link>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-semibold shadow-lg shadow-teal-500/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>{lang === 'ar' ? 'جاري الدخول...' : 'Signing in...'}</span>
                        </>
                    ) : (
                        <>
                            <span>{t('login_btn')}</span>
                            <ArrowIcon className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gray-50 dark:bg-gray-900 text-gray-500">{t('or_continue')}</span>
                </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">GitHub</span>
                </button>
            </div>

            {/* Register Link */}
            <p className="text-center text-gray-600 dark:text-gray-400">
                {t('no_account')}{' '}
                <Link to="/register" className="text-teal-600 hover:text-teal-700 dark:text-teal-400 font-semibold">
                    {t('register_btn')}
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;
