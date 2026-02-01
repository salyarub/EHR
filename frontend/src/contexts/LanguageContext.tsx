import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { translations, type Language, type TranslationKey } from '../i18n/translations';

interface LanguageContextType {
    lang: Language;
    dir: 'rtl' | 'ltr';
    setLang: (lang: Language) => void;
    t: (key: TranslationKey) => string;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLangState] = useState<Language>(() => {
        const saved = localStorage.getItem('ehr-lang');
        return (saved as Language) || 'ar'; // Default to Arabic for Iraq
    });

    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    useEffect(() => {
        document.documentElement.dir = dir;
        document.documentElement.lang = lang;
        localStorage.setItem('ehr-lang', lang);
    }, [lang, dir]);

    const setLang = (newLang: Language) => {
        setLangState(newLang);
    };

    const toggleLanguage = () => {
        setLangState(prev => prev === 'en' ? 'ar' : 'en');
    };

    const t = (key: TranslationKey): string => {
        return translations[lang][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, dir, setLang, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
