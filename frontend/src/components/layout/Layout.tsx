import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Menu, Globe, Home, Users, Settings as SettingsIcon } from 'lucide-react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
    const { t, i18n } = useTranslation();
    const [isDark, setIsDark] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        // Handle Direction based on Language
        document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    useEffect(() => {
        // Handle Dark Mode
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

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            {/* Mobile Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
                <div className="flex h-14 items-center px-4">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mr-2 rtl:ml-2 rtl:mr-0 p-2 rounded hover:bg-muted">
                        <Menu className="h-5 w-5" />
                    </button>
                    <span className="font-bold">{t('Welcome')}</span>
                    <div className="flex-1" />
                    <button onClick={toggleLanguage} className="p-2 mr-2 rtl:ml-2 rtl:mr-0 rounded hover:bg-muted">
                        <Globe className="h-5 w-5" />
                    </button>
                    <button onClick={() => setIsDark(!isDark)} className="p-2 rounded hover:bg-muted">
                        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar (Desktop) / Drawer (Mobile) */}
                <aside className={`
                    fixed inset-y-0 left-0 rtl:right-0 rtl:left-auto z-40 w-64 transform border-r rtl:border-l bg-card transition-transform duration-300 ease-in-out md:translate-x-0 md:static
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'}
                `}>
                    <div className="flex h-14 items-center border-b px-6 font-bold lg:h-[60px]">
                        EHR System
                    </div>
                    <nav className="space-y-1 p-4">
                        <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                            <Home className="h-4 w-4" />
                            {t('Dashboard')}
                        </Link>
                        <Link to="/patients" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                            <Users className="h-4 w-4" />
                            {t('Patients')}
                        </Link>
                        <Link to="/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                            <SettingsIcon className="h-4 w-4" />
                            {t('Settings')}
                        </Link>
                    </nav>

                    <div className="absolute bottom-4 left-0 right-0 p-4 border-t rtl:border-l-0 rtl:border-r-0">
                        {/* Desktop toggles */}
                        <div className="flex items-center justify-between">
                            <button onClick={toggleLanguage} className="p-2 rounded hover:bg-muted flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                <span className="text-sm">{i18n.language === 'en' ? 'العربية' : 'English'}</span>
                            </button>
                            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded hover:bg-muted">
                                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default Layout;
