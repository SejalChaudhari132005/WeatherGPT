import React, { createContext, useContext, useState } from 'react';

export type LanguageCode =
  | 'en'
  | 'hi'
  | 'mr'
  | 'ta'
  | 'te'
  | 'bn'
  | 'gu'
  | 'kn'
  | 'ml'
  | 'or'
  | 'pa';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
];

const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    tagline: 'Your Weather. Your Language. Your Decision.',
    headline: 'Weather intelligence, made conversational.',
    subtitle: 'Ask. Understand. Act.',
    useLocation: 'Use My Location',
    chooseLocation: 'Choose Location',
    detectingLocation: 'Detecting your location...',
    askPlaceholder: 'Ask anything about the weather...',
    askWeatherGPT: 'Ask WeatherGPT',
    goodMorning: 'Good morning',
    goodAfternoon: 'Good afternoon',
    goodEvening: 'Good evening',
    howCanIHelp: 'How can I help you with the weather today?',
    todayForecast: "Today's Forecast",
    sevenDayForecast: '7-Day Forecast',
    weatherAroundYou: 'Weather Around You',
    recommendationTitle: "Today's Recommendation",
    proactiveTitle: 'WeatherGPT noticed something',
    whyThisAnswer: 'Why this answer?',
    farmerTitle: '🌾 Crop Weather Advisory',
    fisherTitle: '🎣 Marine Advisory',
    emergencyTitle: '🚨 EMERGENCY MODE',
    simpleMode: 'Simple Mode',
  },
  hi: {
    tagline: 'आपका मौसम। आपकी भाषा। आपका निर्णय।',
    headline: 'मौसम बुद्धिमत्ता, अब बातचीत के साथ।',
    subtitle: 'पूछें। समझें। कार्य करें।',
    useLocation: 'मेरी सटीक स्थान स्थिति का उपयोग करें',
    chooseLocation: 'स्थान चुनें',
    detectingLocation: 'आपके स्थान की पहचान की जा रही है...',
    askPlaceholder: 'मौसम के बारे में कुछ भी पूछें...',
    askWeatherGPT: 'WeatherGPT से पूछें',
    goodMorning: 'शुभ प्रभात',
    goodAfternoon: 'शुभ दोपहर',
    goodEvening: 'शुभ संध्या',
    howCanIHelp: 'आज मैं मौसम के बारे में आपकी क्या मदद कर सकता हूँ?',
    todayForecast: 'आज का पूर्वानुमान',
    sevenDayForecast: '7 दिनों का पूर्वानुमान',
    weatherAroundYou: 'आपके आसपास का मौसम',
    recommendationTitle: 'आज की सिफारिश',
    proactiveTitle: 'WeatherGPT ने कुछ ध्यान दिया',
    whyThisAnswer: 'यह उत्तर क्यों?',
    farmerTitle: '🌾 फसल मौसम परामर्श',
    fisherTitle: '🎣 समुद्री मौसम सलाह',
    emergencyTitle: '🚨 आपातकालीन मोड',
    simpleMode: 'सरल मोड',
  },
  mr: {
    tagline: 'तुमचे हवामान. तुमची भाषा. तुमचा निर्णय.',
    headline: 'हवामान बुद्धिमत्ता, आता संभाषणात्मक.',
    subtitle: 'विचारा. समजून घ्या. कृती करा.',
    useLocation: 'माझे स्थान वापरा',
    chooseLocation: 'स्थान निवडा',
    detectingLocation: 'तुमचे स्थान शोधत आहे...',
    askPlaceholder: 'हवामानाबद्दल काहीही विचारा...',
    askWeatherGPT: 'WeatherGPT ला विचारा',
    goodMorning: 'शुभ प्रभात',
    goodAfternoon: 'शुभ दुपार',
    goodEvening: 'शुभ संध्या',
    howCanIHelp: 'आज मी तुम्हाला हवामानाबद्दल कशी मदत करू शकतो?',
    todayForecast: 'आजचा अंदाज',
    sevenDayForecast: '७ दिवसांचा अंदाज',
    weatherAroundYou: 'तुमच्या सभोवतालचे हवामान',
    recommendationTitle: 'आजची शिफारस',
    proactiveTitle: 'WeatherGPT ला काही आढळले',
    whyThisAnswer: 'हे उत्तर का?',
    farmerTitle: '🌾 पीक हवामान सल्ला',
    fisherTitle: '🎣 सागरी हवामान सल्ला',
    emergencyTitle: '🚨 आणीबाणी मोड',
    simpleMode: 'सोपा मोड',
  },
  // Fallbacks to English for other regional languages for unmapped keys
  ta: { tagline: 'உங்கள் வானிலை. உங்கள் மொழி. உங்கள் முடிவு.' },
  te: { tagline: 'మీ వాతావరణం. మీ భాష. మీ నిర్ణయం.' },
  bn: { tagline: 'আপনার আবহাওয়া। আপনার ভাষা। আপনার সিদ্ধান্ত।' },
  gu: { tagline: 'તમારું હવામાન. તમારી ભાષા. તમારો નિર્ણય.' },
  kn: { tagline: 'ನಿಮ್ಮ ಹವಾಮಾನ. ನಿಮ್ಮ ಭಾಷೆ. ನಿಮ್ಮ ನಿರ್ಧಾರ.' },
  ml: { tagline: 'നിങ്ങളുടെ കാലാവസ്ഥ. നിങ്ങളുടെ ഭാഷ. നിങ്ങളുടെ തീരുമാനം.' },
  or: { tagline: 'ଆପଣଙ୍କର ପାଣିପାଗ | ଆପଣଙ୍କର ଭାଷା |' },
  pa: { tagline: 'ਤੁਹਾਡਾ ਮੌਸਮ। ਤੁਹਾਡੀ ਭਾਸ਼ਾ।' },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>('en');

  const t = (key: string): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
