import { useContext } from 'react';
import { DataContext } from '../context/contextData';

// 1. Defined without `as const` so properties infer type `string` instead of exact literal strings
export const languagesList = {
  arabic: {
    langAr: 'العربية',
    langEn: 'الإنجليزية',
    settingsEdt: 'إعدادات',
    profileEdt: 'تعديل الملف الشخصي',
    leaderBoard: 'لوحة المتصدرين',
    langEdt: 'اللغة',
    soundEdt: 'الصوت',
    vibrateEdt: 'الإهتزاز',
    apparenceEdt: 'المظهر',
    contactUsEdt: 'الإبلاغ عن مشكلة',
    contactUsPlh: 'يمكنك ان تكتب مشكلة هنا ...',
    lang: '',
    email: 'البريد الإلكتروني',
    restEdt: 'اعادة ضبط',
    deleteEdt: 'حذف الحساب',
    logout: 'تسجيل الخروج',
    soundEnable: 'تم تفعيل الصوت',
    soundDisable: 'تم تعطيل الصوت',
    vibrateEnable: 'تم تفعيل الإهتزاز',
    vibrateDisable: 'تم تعطيل الإهتزاز',
    dark: 'داكن',
    light: 'فاتح',
    gradient: 'تدرج',

    // Statistics
    rank: 'التصنيف',
    correct: 'الصحيحة',
    wrong: 'الخاطئة',
    fast: 'السرعة',
    quest: 'الاسئلة',
    questIndex: 'الحالي',

    // Levels
    level: 'المرحلة',
    quests: 'أسئلة',

    // SnackBars
    languageChanged: 'تم تغيير اللغة بنجاح',
    accountDeleted: 'تم حذف الحساب بنجاح',
    dataReseted: 'تم حذف البيانات بنجاح',
    themeChanged: 'تم تغيير المظهر الى',
    logoutDone: 'تم تسجيل الخروج',
  },
  english: {
    // Profile
    langEn: 'English',
    langAr: 'Arabic',
    settingsEdt: 'Settings',
    profileEdt: 'Edit Profile',
    leaderBoard: 'Leaderboard',
    langEdt: 'Language',
    soundEdt: 'Sound',
    vibrateEdt: 'Vibrate',
    apparenceEdt: 'Appearance',
    contactUsEdt: 'Contact us',
    restEdt: 'Reset',
    contactUsPlh: 'Write your contactUs here...',
    email: 'Email',

    deleteEdt: 'Delete Account',
    logout: 'Logout',
    soundEnable: 'Sound Enable',
    soundDisable: 'Sound Disable',
    vibrateEnable: 'Vibration Enable',
    vibrateDisable: 'Vibration Disable',
    dark: 'Dark',
    light: 'Light',
    gradient: 'Gradient',

    // Statistics
    rank: 'Rank',
    correct: 'Correct',
    wrong: 'Wrong',
    fast: 'Fast',
    quest: 'Questions',
    questIndex: 'Index',

    // Levels
    level: 'Level',
    quests: 'Questions',
    lang: '',

    // SnackBars
    languageChanged: 'Language Changed successfully',
    accountDeleted: 'Account Deleted successfully',
    dataReseted: 'Data Reseted successfully',
    themeChanged: 'Theme Changed to',
    logoutDone: 'logout successfully',

    // permits categories
    permitCategories: {
      b: {
        title: 'B',
        description: '',
      },
      b1: {
        title: 'B1',
        description: '',
      },
    }
  },
};

export type Language = keyof typeof languagesList;
// 2. Map all property values to `string`
export type LanguageTexts = Record<
  keyof (typeof languagesList)['arabic'],
  string
>;

export const useTexts = (): LanguageTexts => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useTexts must be used within a DataProvider');
  }

  const { language } = context;

  const selectedLanguage =
    (language as Language) in languagesList
      ? (language as Language)
      : 'english';

  return languagesList[selectedLanguage];
};
