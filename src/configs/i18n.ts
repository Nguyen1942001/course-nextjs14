import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n.use(Backend)

    // Enable automatic language detection
    .use(LanguageDetector)

    // Enables the hook initialization module
    .use(initReactI18next)
    .init({
        lng: 'vi',
        backend: {
            /* translation file path */
            //  Các file json chứa các nội dung dịch của các ngôn ngữ khác nhau
            loadPath: '/locales/{{lng}}.json',
        },
        fallbackLng: 'vi', // Mặc định là vi
        debug: false,
        keySeparator: false,
        react: {
            useSuspense: false,
        },
        interpolation: {
            escapeValue: false,
            formatSeparator: ',', // Dùng cho đơn vị tiền - vd: 100,000
        },
    });

export default i18n;

export const LANGUAGE_OPTIONS = [
    {
        lang: 'Tiếng việt',
        value: 'vi',
    },
    {
        lang: 'English',
        value: 'en',
    },
];
