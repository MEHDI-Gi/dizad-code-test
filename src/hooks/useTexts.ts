import { useContext } from 'react';
import { DataContext } from '../context/contextData';

// 1. Defined without `as const` so properties infer type `string` instead of exact literal strings
export const languagesList = {
  arabic: {
    exmTitle: 'إمتحان',
    sgnTitle: 'إشارات',
    qstTitle: 'أسئلة',
    priTitle: 'أولوية',

    bottomTabs: {
      bookmarks: 'محفوظة',
      home: 'رئيسية',
      learn: 'تعلم',
      exam: 'إمتحان',
    },

    langAr: 'العربية',
    langEn: 'الإنجليزية',
    settingsEdt: 'إعدادات',
    profileEdt: 'تعديل الملف الشخصي',
    leaderBoard: 'لوحة المتصدرين',

    idNumberEdt: 'ID رقم',
    langEdt: 'لغة',
    soundEdt: 'صوت',
    vibrateEdt: 'إهتزاز',
    apparenceEdt: 'مظهر',
    contactUsEdt: 'تواصل معنا',
    resetDataEdt: 'اعادة ضبط',
    deleteEdt: 'حذف الحساب',
    gradientEdt: 'تدرج',
    darkModeEdt: 'وضع الداكن',
    statisticsEdt: 'إحصائيات',
    email: 'البريد الإلكتروني',
    logout: 'تسجيل الخروج',

    contactUsPlh: 'يمكنك ان تكتب مشكلة هنا ...',
    lang: '',
    soundEnable: 'تم تفعيل الصوت',
    soundDisable: 'تم تعطيل الصوت',
    vibrateEnable: 'تم تفعيل الإهتزاز',
    vibrateDisable: 'تم تعطيل الإهتزاز',
    dark: 'داكن',
    light: 'فاتح',

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
    exmTitle: 'Exam',
    sgnTitle: 'Signs',
    qstTitle: 'Questions',
    priTitle: 'Priority',

    bottomTabs: {
      bookmarks: 'Bookmarks',
      home: 'Home',
      learn: 'Learn',
      exam: 'Exam',
    },

    // Profile
    langEn: 'English',
    langAr: 'Arabic',

    idNumberEdt: 'ID Number',
    settingsEdt: 'Settings',
    profileEdt: 'Edit Profile',
    gradientEdt: 'Gradient',
    leaderBoard: 'Leaderboard',
    langEdt: 'Language',
    soundEdt: 'Sound',
    vibrateEdt: 'Vibrate',
    apparenceEdt: 'Appearance',
    contactUsEdt: 'Contact us',
    darkModeEdt: 'Dark Mode',
    statisticsEdt: 'Statistics',
    resetDataEdt: 'Reset Data',
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
