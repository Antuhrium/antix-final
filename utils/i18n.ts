import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import landing from '@/public/locales/en/landing.json';
import news from '@/public/locales/en/news.json';
import dashboard from '@/public/locales/en/dashboard.json';

i18n.use(initReactI18next).init({
    resources: {
        en: {
          landing,
          dashboard,
          news
        },
      },
  lng: 'en',
  fallbackLng: 'en',
});

export default i18n;
