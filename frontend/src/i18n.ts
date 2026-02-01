import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    en: {
        translation: {
            "Welcome": "Welcome to Centralized EHR",
            "Dashboard": "Dashboard",
            "Patients": "Patients",
            "Settings": "Settings",
            "Language": "Language",
            "Theme": "Theme",
            "Logout": "Logout",
        }
    },
    ar: {
        translation: {
            "Welcome": "مرحباً بكم في نظام السجلات الصحية المركزي",
            "Dashboard": "لوحة التحكم",
            "Patients": "المرضى",
            "Settings": "الإعدادات",
            "Language": "اللغة",
            "Theme": "المظهر",
            "Logout": "تسجيل الخروج",
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", // default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
