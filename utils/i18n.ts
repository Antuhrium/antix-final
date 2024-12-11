import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import landing from '@/public/locales/en/landing.json';
import dashboard from '@/public/locales/en/dashboard.json';

export const languages = [
  { code: 'pt-br', name: 'Brazilian', flag: '/images/flags/Brazilian.png' },
  { code: 'zh', name: 'Chinese', flag: '/images/flags/Chinese.png' },
  { code: 'cs', name: 'Czech', flag: '/images/flags/Czech.png' },
  { code: 'en', name: 'English', flag: '/images/flags/English.png' },
  { code: 'fr', name: 'French', flag: '/images/flags/French.png' },
  { code: 'de', name: 'German', flag: '/images/flags/German.png' },
  { code: 'id', name: 'Indonesian', flag: '/images/flags/Indonesian.png' },
  { code: 'it', name: 'Italian', flag: '/images/flags/Italian.png' },
  { code: 'ja', name: 'Japanese', flag: '/images/flags/Japanese.png' },
  { code: 'ko', name: 'Korean', flag: '/images/flags/Korean.png' },
  { code: 'lv', name: 'Latvian', flag: '/images/flags/Latvian.png' },
  { code: 'ms', name: 'Malay', flag: '/images/flags/Malay.png' },
  { code: 'pl', name: 'Polish', flag: '/images/flags/Polish.png' },
  { code: 'pt', name: 'Portuguese', flag: '/images/flags/Portuguese.png' },
  { code: 'ro', name: 'Romanian', flag: '/images/flags/Romanian.png' },
  { code: 'ru', name: 'Russian', flag: '/images/flags/Russian.png' },
  { code: 'es', name: 'Spanish', flag: '/images/flags/Spanish.png' },
  { code: 'tr', name: 'Turkish', flag: '/images/flags/Turkish.png' },
  { code: 'uk', name: 'Ukrainian', flag: '/images/flags/Ukrainian.png' },
  { code: 'vi', name: 'Vietnamese', flag: '/images/flags/Vietnamese.png' },
];

export const getCurrentLanguageInfo = () => {
  const currentLanguageCode = i18n.language;
  const currentLanguage = languages.find(lang => lang.code === currentLanguageCode);
  return currentLanguage || languages[0];
};

const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null;
const language = savedLanguage || 'en'; 

i18n.use(initReactI18next).init({
  resources: {
    en: {
      landing,
      dashboard,
    },
    // ru: { landing: ruLanding, dashboard: RuDashboard },
  },
  lng: language,
  fallbackLng: 'en',
  react: {
    useSuspense: false, 
  },
});

export default i18n;
