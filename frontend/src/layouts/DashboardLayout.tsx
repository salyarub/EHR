import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import {
    LayoutDashboard,
    Users,
    Calendar,
    FileText,
    FlaskConical,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    X,
    Globe,
    Moon,
    Sun,
    Bell,
    Search,
    ChevronDown,
    Activity,
} from 'lucide-react';

const navItems = [
    { path: '/', icon: LayoutDashboard, labelKey: 'sidebar_dashboard' },
    { path: '/patients', icon: Users, labelKey: 'sidebar_patients' },
    { path: '/appointments', icon: Calendar, labelKey: 'sidebar_appointments' },
    { path: '/prescriptions', icon: FileText, labelKey: 'sidebar_prescriptions' },
    { path: '/lab-results', icon: FlaskConical, labelKey: 'sidebar_lab_results' },
    { path: '/reports', icon: BarChart3, labelKey: 'sidebar_reports' },
];

const DashboardLayout = () => {
    const { lang, t, toggleLanguage, dir } = useLanguage();
    const { isDark, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Get user from localStorage
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const userInitial = user?.first_name?.charAt(0) || user?.username?.charAt(0) || 'U';

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - RTL aware */}
            <aside
                className={`fixed inset-y-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} z-50 w-72 bg-white dark:bg-gray-800 ${dir === 'rtl' ? 'border-l' : 'border-r'
                    } border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${sidebarOpen
                        ? 'translate-x-0'
                        : dir === 'rtl' ? 'translate-x-full' : '-translate-x-full'
                    } lg:translate-x-0`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900 dark:text-white text-sm">
                                {lang === 'ar' ? 'نظام السجلات' : 'EHR System'}
                            </h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {lang === 'ar' ? 'العراق' : 'Iraq'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${active
                                        ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg shadow-teal-500/30'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{t(item.labelKey as any)}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <Link
                        to="/settings"
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 mb-2"
                    >
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">{t('sidebar_settings')}</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">{t('sidebar_logout')}</span>
                    </button>
                </div>
            </aside>

            {/* Main Content - RTL aware */}
            <div className={`${dir === 'rtl' ? 'lg:mr-72' : 'lg:ml-72'}`}>
                {/* Top Navbar */}
                <header className="sticky top-0 z-30 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 flex items-center justify-between">
                    {/* Left Side */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Search */}
                        <div className="hidden md:flex items-center">
                            <div className="relative">
                                <Search className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400`} />
                                <input
                                    type="text"
                                    placeholder={t('search_placeholder')}
                                    className={`w-80 ${dir === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 border-0 focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-white placeholder-gray-500`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-2">
                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
                            title={t('language')}
                        >
                            <Globe className="w-5 h-5" />
                        </button>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
                            title={t('theme')}
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {/* Notifications */}
                        <button className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className={`absolute top-1.5 ${dir === 'rtl' ? 'left-1.5' : 'right-1.5'} w-2 h-2 bg-red-500 rounded-full`}></span>
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                                    {userInitial}
                                </div>
                                <div className="hidden sm:block text-start">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {user?.first_name || user?.username || 'User'}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {user?.role || 'Staff'}
                                    </p>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>

                            {/* Dropdown Menu */}
                            {profileOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setProfileOpen(false)}
                                    />
                                    <div className={`absolute ${dir === 'rtl' ? 'left-0' : 'right-0'} mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-20`}>
                                        <Link
                                            to="/profile"
                                            onClick={() => setProfileOpen(false)}
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            {t('profile')}
                                        </Link>
                                        <Link
                                            to="/settings"
                                            onClick={() => setProfileOpen(false)}
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            {t('sidebar_settings')}
                                        </Link>
                                        <hr className="my-2 border-gray-200 dark:border-gray-700" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-start px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        >
                                            {t('sidebar_logout')}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
