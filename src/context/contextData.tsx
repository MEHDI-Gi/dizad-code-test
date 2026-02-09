import React, {
  createContext,
  useRef,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import { AppState, Vibration, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAsyncStorageState } from '../hooks/useAsyncStorageState';
import Sound from 'react-native-sound';
import { useGoogleSignIn } from './auth';
import { database, auth } from './firebaseConfig';
import {
  ref,
  set,
  onValue,
  update,
  firebase,
  increment,
  serverTimestamp,
} from '@react-native-firebase/database';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useVip } from '../hooks/useVip';
import { useFirebaseData } from '../hooks/useFirebaseData';

const DataContext = createContext<any>(null);

interface DataProviderProps {
  children: ReactNode;
}

const DataProvider = ({ children }: DataProviderProps) => {

  const { user, initializing, signIn, logout } = useGoogleSignIn();

  const [userOnline, setUserOnline] = useState<boolean>(false);
  const [globTrueAns, setGlobTrueAns] = useState<number>(0);
  const [globFalseAns, setGlobFalseAns] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userAccuracy, setUserAccuracy] = useAsyncStorageState<number>('UserAccuracy', 0);

  const [userPlan, setUserPlan] = useAsyncStorageState<string>('UserPlan', 'free');

  const [language, setLanguage] = useAsyncStorageState<string>(
    'Language',
    'english',
  );
  const [isGradient, setIsGradient] = useAsyncStorageState<boolean>(
    'Gradient',
    false,
  );
  const [vibrate, setVibrate] = useAsyncStorageState<boolean>('Vibrate', true);
  const [sound, setSound] = useAsyncStorageState<boolean>('Sound', true);
  const [speed, setSpeed] = useAsyncStorageState<number>('Speed', 0);

  const [questionsItemsIndex, setQuestionsItemsIndex] =
    useAsyncStorageState<number>('QuestionsItemIndex', 0);

  const [currentTheme, setCurrentTheme] = useAsyncStorageState<'dark' | 'light'>(
    'Apparence',
    'dark',
  );

  // --- 1. TYPE DEFINITIONS ---
  // Define what a tracked item looks like now (with viewCount)
  interface AccuracyItem {
    id: string;
    viewCount: number;
    timestamp: number | object; // Accepts number (local) or object (serverTimestamp)
  }

  type CategoryAccuracyProgress = Record<string, AccuracyItem>;
  type AccuracyProgState = {
    signs: CategoryAccuracyProgress;
    questions: CategoryAccuracyProgress;
    priority: CategoryAccuracyProgress;
  };

  // --- INSIDE YOUR COMPONENT OR HOOK ---

  // 2. STATE INITIALIZATION
  const [accuracyProgress, setAccuracyProgress] = useState<AccuracyProgState>({
    signs: {},
    questions: {},
    priority: {},
  });

  // 3. THE VIEW INCREMENT FUNCTION
  // 1. Add this ref inside your component/provider to track current session views
  // Only change if user or DB changes


  type CategoryBookmarks = Record<string, BookmarkItem>;
  type BookmarksState = {
    signs: CategoryBookmarks;
    questions: CategoryBookmarks;
    priority: CategoryBookmarks;
  };

  const [bookmarks, setBookmarks] = useState<BookmarksState>({
    signs: {},
    questions: {},
    priority: {},
  });

  const [dataLevelIndex, setDataLevelIndex] = useState<number>(1);
  const [quizCategoriesData, setQuizCategoriesData] = useState<string[]>([]);

  // const [usersData, setUsersData] = useState<Record<string, any>>({});
  const [examsData, setExamsData] = useState<Record<string, any>>({});
  const [lessonsData, setLessonsData] = useState<Record<string, any>>({});
  const [firebaseLoaded, setFirebaseLoaded] = useState<boolean>(false);
  const [examsLoaded, setExamsLoaded] = useState<boolean>(false);
  const [lessonsLoaded, setLessonsLoaded] = useState<boolean>(false);
  // const [usersLoaded, setUsersLoaded] = useState<boolean>(false);
  const [userLoaded, setUserLoaded] = useState<boolean>(false);

  const [globalQuestionsLength, setGobalQuestionsLength] = useState<
    number | null
  >(null);

  useFirebaseData(user, {
    setLessonsData,
    setLessonsLoaded,
    setExamsData,
    setExamsLoaded,
    setQuizCategoriesData,
    setUserLoaded,
    setFirebaseLoaded,
    setUserData: (data) => {
      if (!data.Username && user?.displayName) {
        update(ref(database, `users/${user.uid}`), { Username: user.displayName });
        setUserName(user.displayName);
      } else {
        // Fallback to Google display name if Firebase data is somehow empty
        setUserName(data.Username ?? user?.displayName ?? '');
      }

      // Image Logic
      if (!data.UserImage && user?.photoURL) {
        update(ref(database, `users/${user.uid}`), { UserImage: user.photoURL });
        setUserImage(user.photoURL);
      } else {
        setUserImage(data.UserImage ?? user?.photoURL ?? null);
      }
      setAccuracyProgress(data.AccuracyProgress ?? { signs: {}, questions: {}, priority: {} })
      setUserOnline(data.UserOnline ?? false);
      setUserAccuracy(data.UserAccuracy ?? 0);
      setUserPlan(data.UserPlan ?? 'free');
      setGlobTrueAns(data.GlobTrueAns ?? 0);
      setGlobFalseAns(data.GlobFalseAns ?? 0);
      setBookmarks(data.Bookmarks ?? { signs: {}, questions: {}, priority: {} });
    }
  });
  useEffect(() => {
    if (lessonsLoaded && examsLoaded && userLoaded) {
      setFirebaseLoaded(true);
    } else {
      setFirebaseLoaded(false);
    }
  }, [lessonsLoaded, examsLoaded, userLoaded]);


  const [signsItemsIndex, setSignsItemsIndex] = useState<number>(0);
  const [priorityItemsIndex, setPriorityItemsIndex] = useState<number>(0);

  const dataArray = Object.values(examsData);
  const dataLength = Object.keys(examsData).length;

  const [isPicAdd, setIsPicAdd] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [isAccountDeleted, setIsAccountDeleted] = React.useState<
    boolean | null
  >(null);
  const [snackOptions, setSnackOptions] = useState<{
    label: string;
    icon: string;
  }>({ label: '', icon: '' });
  const [loadingOptions, setLoadingOptions] = useState({ label: '', icon: '' });
  const [loadScreen, setLoadScreen] = useState<boolean>(false);
  let snackVisibility = {
    logout: false,
    accountDeleted: false,
    apparence: false,
    reset: false,
  };
  const [isActIndicator, setIsActIndicator] = useState<boolean>(false);



  const languagesList = {
    arabic: {
      langAr: 'العربية',
      langEn: 'الإنجليزية',
      settingsEdt: 'إعدادات',
      profileEdt: 'تعديل الملف الشخصي',
      leaderBoard: 'لوحة المتصدرين',
      langEdt: 'اللغة',
      soundEdt: 'الصوت',
      vibrateEdt: 'الإهتزاز',
      apparenceEdt: 'المضهر',
      reportEdt: 'الإبلاغ عن مشكلة',
      reportPlh: 'يمكنك ان تكتب مشكلة هنا ...',
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

      //SnackBars
      languageChanged: 'تم تغيير اللغة بنجاح',
      accountDeleted: 'تم حذف الحساب بنجاح',
      dataReseted: 'تم حذف البيانات بنجاح',
      themeChanged: 'تم تغيير المضهر الى',
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
      reportEdt: 'Report Issue',
      restEdt: 'Reset',
      reportPlh: 'Write your report here...',
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
    },
  };

  type Language = 'arabic' | 'english';
  type LanguageTexts = typeof languagesList.arabic; // Infers all text properties

  const texts: LanguageTexts = languagesList[language as Language];


  const sessionViewed = useRef<Set<string>>(new Set());

  const incrementView = useCallback((category: keyof AccuracyProgState, item: any) => {
    if (!user?.uid || !item?.id) return;

    const itemId = String(item.id);
    const sessionKey = `${category}-${itemId}`;

    if (sessionViewed.current.has(sessionKey)) return;
    sessionViewed.current.add(sessionKey);

    setAccuracyProgress((prev) => {
      const categoryData = prev[category] || {};
      return {
        ...prev,
        [category]: {
          ...categoryData,
          [itemId]: {
            id: itemId,
          },
        },
      };
    });

    const itemPath = `users/${user.uid}/AccuracyProgress/${category}/${itemId}`;
    const itemRef = ref(database, itemPath);

    update(itemRef, {
      id: itemId,
    }).catch((err) => {
      sessionViewed.current.delete(sessionKey);
    });
  }, [user?.uid, database]);

  interface BookmarkItem {
    id?: string;
    timestamp?: number;
  }

  const buildItemKey = (item: BookmarkItem): string | null => {
    if (!item || !item.id) return null;
    return String(item.id); // Only use ID
  };

  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const toggleBookmark = (category: keyof BookmarksState, item: any) => {
    if (!user?.uid || bookmarkLoading) return;

    try {
      if (!item?.id) {
        console.warn('toggleBookmark: item missing ID', item);
        return;
      }
      setBookmarkLoading(true);

      const itemId = String(item.id);
      // OPTIMISTIC UPDATE - store ONLY ID reference
      setBookmarks(prevBookmarks => {
        const currentCategory = prevBookmarks?.[category] ?? {};
        const categoryBookmarks = { ...currentCategory };
        const wasBookmarked = !!categoryBookmarks[itemId];

        if (wasBookmarked) {
          delete categoryBookmarks[itemId];
        } else {
          // Store MINIMAL data - just ID + basics for display
          categoryBookmarks[itemId] = {
            id: itemId,
            timestamp: Date.now(),
          };
        }

        const fullBookmarks = {
          signs: prevBookmarks?.signs ?? {},
          questions: prevBookmarks?.questions ?? {},
          priority: prevBookmarks?.priority ?? {},
        };
        fullBookmarks[category] = categoryBookmarks;

        // Write to Firebase
        update(ref(database, `users/${user.uid}/Bookmarks`), fullBookmarks)
          .then(() => {
            console.log(`✅ Firebase SUCCESS`);
            setBookmarkLoading(false); // Hide on success
          })
          .catch(error => {
            console.error('🔥 Firebase bookmark sync failed:', error);
            setBookmarkLoading(false);
          });

        console.log(
          `📱 Bookmark ${wasBookmarked ? 'REMOVED' : 'ADDED'}:`,
          itemId,
          'in',
          category,
        );

        return {
          ...prevBookmarks,
          [category]: categoryBookmarks,
        };
      });
    } catch (error) {
      console.error('💥 Bookmark toggle CRASH:', error);
      setBookmarkLoading(false);
    }
  };

  const isBookmarked = (
    category: keyof BookmarksState,
    item: BookmarkItem,
  ): boolean => {
    const itemKey = buildItemKey(item);
    if (!itemKey) return false;
    const categoryBookmarks = bookmarks[category] || {};
    return !!categoryBookmarks[itemKey];
  };

  // NEW: Load bookmark details from main data
  const getBookmarkedItem = (
    category: keyof BookmarksState,
    itemId: string,
  ) => {
    // Fetch from main data source using ID
    // e.g., firebase.database().ref(`learn/.../${itemId}`).once('value')
    const bookmark = bookmarks[category]?.[itemId];
    return bookmark ? { id: itemId, ...bookmark } : null;
  };

  const resetBookmarks = (category: keyof BookmarksState) => {
    setBookmarks(prev => ({
      ...prev,
      [category]: {},
    }));
  };

  const [isRewardAdd, setIsRewardAdd] = useState(false);

  Sound.setCategory('Playback');

  const soundFiles = {
    quizButton: 'pop_1.mp3',
    settingsButton: 'pop_1.mp3',
    levelsButton: 'pop_1.mp3',
    welcomeIntro: 'intro.mp3',
    levelEnd: 'bonus.mp3',
    timeOut: 'time_out.mp3',
    correctAnswer: 'level_up.mp3',
    wrongAnswer: 'error.mp3',
    alert: 'alert.mp3',
    reAddHearts: 'refull.mp3',
    // add more sounds here
  };

  const sounds = useRef<Record<string, Sound>>({});

  useEffect(() => {
    Object.entries(soundFiles).forEach(([key, file]) => {
      sounds.current[key] = new Sound(file, Sound.MAIN_BUNDLE, error => {
        if (error) console.error(`Failed to load sound "${key}":`, error);
      });
    });
    return () => {
      Object.values(sounds.current).forEach(sound => sound && sound.release());
    };
  }, []);

  const unloadSounds = () => {
    Object.values(sounds.current).forEach(sound => {
      sound && sound.release();
    });
  };

  const playSound = (key: string | number) => {
    const sound = sounds.current[key];
    if (sound)
      sound.play(success => {
        if (!success) console.error(`Failed to play sound "${key}".`);
      });
  };

  const [snackbarState, setSnackbarState] = useState<boolean>(false);
  const [vipCard, setVipCard] = useState<boolean>(false);
  const [freeCard, setFreeCard] = useState<boolean>(false);
  const [statisticsCard, setStatisticsCard] = useState<boolean>(false);
  const [vipPlansCard, setVipPlansCard] = useState<boolean>(false);

  const [dataAsync, setDataAsync] = useState<boolean>(false);

  const prevDataRef = useRef<Record<string, any> | null>(null);

  const dataToUpdate = useMemo(
    () => ({
      UserAccuracy: userAccuracy,
      GlobTrueAns: globTrueAns,
      GlobFalseAns: globFalseAns,
    }),
    [
      userAccuracy,
      globTrueAns,
      globFalseAns,
    ],
  );

  useEffect(() => {
    if (!user?.uid || dataAsync) return;

    if (JSON.stringify(prevDataRef.current) !== JSON.stringify(dataToUpdate)) {
      prevDataRef.current = dataToUpdate;
      setDataAsync(true);
      update(ref(database, `users/${user.uid}`), dataToUpdate).finally(() =>
        setDataAsync(false),
      );
    }
  }, [user?.uid, dataAsync, dataToUpdate]);

  const [leaderBoardIcon, setLeaderBoardIcon] = useState(false);

  const [isLogout, setIsLogout] = useState(true);
  const keysToRemove = [
    'UserImage',
    'UserName',
    'QuestionsItemIndex',
    'AccuracyProgress',
    'UserOnline',
    'UserAccuracy',
    'userPlan',
    'Speed',
    'Language',
    'GlobTrueAns',
    'GlobFalseAns',
    'Gradient',
    'Vibrate',
    'Sound',
    'HelpPoint',
    'LivesHeart',
    'DataLevelIndex',
    'QuestIndices',
    'AnswerStats',
    'Apparence',
    'lastLifeUpdate',
  ];
  const handleLogout = async (navigation: NavigationProp<ParamListBase>) => {
    if (user) {
      try {
        setIsLogout(false);



        setUserName('');
        setUserImage(null);
        setUserAccuracy(0);
        setBookmarks({ signs: {}, questions: {}, priority: {} });
        setUserPlan('free')
        setLessonsLoaded(false);
        setExamsLoaded(false);
        setUserLoaded(false);

        await logout();
        await AsyncStorage.multiRemove(keysToRemove);
        navigation.navigate('Login');
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        setIsLogout(true);
      }
    }
  };

  const toggleBookmarkMemo = useCallback(toggleBookmark, [
    user?.uid,
    bookmarks,
  ]);
  const playSoundMemo = useCallback(playSound, []);
  const handleLogoutMemo = useCallback(handleLogout, [user?.uid]);

  const imgBase = "https://cdn.jsdelivr.net/gh/MEHDI-Gi/dizad_road_test_assets@main/assets"

  const contextValue = useMemo(
    () => ({
      user, initializing, signIn, logout,
      bookmarkLoading,
      setBookmarkLoading,
      globalQuestionsLength,
      dataAsync,
      isLogout,
      setIsLogout,
      handleLogout: handleLogoutMemo,
      firebaseLoaded,
      setFirebaseLoaded,
      setExamsLoaded,
      // setUsersLoaded,
      setUserLoaded,
      userPlan,
      setUserPlan,
      quizCategoriesData,
      leaderBoardIcon,
      setLeaderBoardIcon,
      speed,
      setSpeed,
      userAccuracy,
      setUserAccuracy,
      accuracyProgress,
      setAccuracyProgress,
      userOnline,
      setUserOnline,
      vipCard,
      setVipCard,
      freeCard,
      setFreeCard,
      statisticsCard,
      setStatisticsCard,
      vipPlansCard,
      setVipPlansCard,
      snackbarState,
      setSnackbarState,
      playSound: playSoundMemo,
      // pushToProgress ,setPushToProgress,
      examsData,
      dataLength,
      dataArray,
      //  usersData,
      dataLevelIndex,
      setDataLevelIndex,

      questionsItemsIndex,
      setQuestionsItemsIndex,

      bookmarks,
      setBookmarks,
      resetBookmarks,
      toggleBookmark: toggleBookmarkMemo,
      isBookmarked,
      globTrueAns,
      setGlobTrueAns,
      globFalseAns,
      setGlobFalseAns,
      loading,
      userName,
      setUserName,
      isPicAdd,
      setIsPicAdd,
      userImage,
      setUserImage,
      isActIndicator,
      setIsActIndicator,
      language,
      setLanguage,
      currentTheme,
      setCurrentTheme,
      isRewardAdd,
      setIsRewardAdd,
      vibrate,
      setVibrate,
      sound,
      setSound,
      isGradient,
      setIsGradient,
      languagesList,
      texts,
      isAccountDeleted,
      setIsAccountDeleted,
      snackVisibility,
      snackOptions,
      setSnackOptions,
      loadingOptions,
      setLoadingOptions,
      loadScreen,
      setLoadScreen,
      lessonsData,
      lessonsLoaded,
      setSignsItemsIndex,
      signsItemsIndex,
      priorityItemsIndex, setPriorityItemsIndex,
      imgBase,
      incrementView,
    }),
    [
      incrementView,
      accuracyProgress,
      user, initializing, signIn, logout,
      questionsItemsIndex,
      signsItemsIndex,
      priorityItemsIndex,
      lessonsData,
      examsData,
      currentTheme,
      userName,
      userImage,
      vibrate,
      sound,
      language,
      userAccuracy,
      freeCard,
      vipCard,
      vipPlansCard,
      bookmarks,
      firebaseLoaded,
      userPlan,
      globTrueAns,
      globFalseAns,
      bookmarkLoading,
    ],
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
export { DataContext, DataProvider };
