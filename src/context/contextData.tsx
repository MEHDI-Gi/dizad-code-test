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
} from '@react-native-firebase/database';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

const DataContext = createContext<any>(null);

interface DataProviderProps {
  children: ReactNode;
}

const DataProvider = ({ children }: DataProviderProps) => {
  const { user, initializing, signIn, logout } = useGoogleSignIn();

  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';
  type Theme = 'dark' | 'light';
  const [userXp, setUserXp] = useState<number>(0);
  const [userOnline, setUserOnline] = useState<boolean>(false);
  const [globTrueAns, setGlobTrueAns] = useState<number>(0);
  const [globFalseAns, setGlobFalseAns] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userPlan, setUserPlan] = useState<string>('free');

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
  const [currentTheme, setCurrentTheme] = useAsyncStorageState<Theme>(
    'CurrentTheme',
    THEME_DARK,
  );
  const [questionsItemsIndex, setQuestionsItemsIndex] =
    useAsyncStorageState<number>('QuestionsItemIndex', 0);

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

  const unsubscribeLessonsListener = useRef<(() => void) | null>(null);
  const unsubscribeExamsListener = useRef<(() => void) | null>(null);
  // const unsubscribeUsersListener = useRef<(() => void) | null>(null);
  const unsubscribeUserListener = useRef<(() => void) | null>(null);

  useEffect(() => {
    const lessonsDataRef = ref(database, '/lessons');
    const examsDataRef = ref(database, '/exams');
    // const usersDataRef = ref(database, '/users');

    unsubscribeLessonsListener.current = onValue(lessonsDataRef, snapshot => {
      const fetchedData = snapshot.val();
      if (fetchedData) {
        setLessonsData(fetchedData);
        setLessonsLoaded(true);
        console.log('Lessons data loaded');
      } else {
        console.log('No lessons data');
      }
    });

    unsubscribeExamsListener.current = onValue(examsDataRef, snapshot => {
      const fetchedData = snapshot.val();
      if (fetchedData) {
        const keys = Object.keys(fetchedData);
        setQuizCategoriesData(keys);
        setExamsData(fetchedData);
        console.log('Quiz data loaded');
        setExamsLoaded(true);
      } else {
        console.log('No quiz data');
      }
    });

    // unsubscribeUsersListener.current = onValue(usersDataRef, (snapshot) => {
    //   const fetchedData = snapshot.val();
    //   if (fetchedData) {
    //     setUsersData(fetchedData);
    //     setUsersLoaded(true);
    //     console.log('Users data loaded');
    //   } else {
    //     console.log('No users data');
    //   }
    // });

    const handleUserData = async () => {

      const userDataRef = ref(database, `users/${user.uid}`);

      unsubscribeUserListener.current = onValue(userDataRef, snapshot => {
        const creationTime =
          auth.currentUser?.metadata?.creationTime || new Date().toISOString();

        const firebaseData = snapshot.val();
        if (firebaseData) {
          console.log('User data loaded');
          setUserLoaded(true);

          if (!firebaseData.firstSignIn) {
            update(ref(database, `users/${user.uid}`), {
              firstSignIn: creationTime,
            }).catch(console.error);
          }
          setUserOnline(firebaseData.UserOnline ?? false);
          setUserXp(firebaseData.UserXp ?? 0);
          setUserPlan(firebaseData.userPlan ?? 'free');
          setUserName(firebaseData.Username ?? user.displayName);
          setUserImage(firebaseData.UserImage ?? user.photoURL);
          setGlobTrueAns(firebaseData.GlobTrueAns ?? 0);
          setGlobFalseAns(firebaseData.GlobFalseAns ?? 0);
          if (!firebaseData.Bookmarks) {
            const emptyBookmarks = { signs: {}, questions: {}, priority: {} };
            update(ref(database, `users/${user.uid}`), {
              Bookmarks: emptyBookmarks,
            }).catch(console.error);
            setBookmarks(emptyBookmarks);
          } else {
            setBookmarks(firebaseData.Bookmarks);
          }

        }
      });
    };

    handleUserData();

    return () => {
      unsubscribeLessonsListener.current?.();
      unsubscribeExamsListener.current?.();
      unsubscribeUserListener.current?.();
      console.log('Unsubscribed Firebase listeners');
      setLessonsLoaded(false);
      setExamsLoaded(false);
      setUserLoaded(false);
    };
  }, [user?.uid]);

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

  console.log('your global data');
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

  const colorsList: any = {
    darkColors: {
      primary: '#16161e',
      secondary: '#1a1b26',
      // secondary: '#1B2631',

      exm: '#282a3a',
      opacity: {
        primary: '#00000098',
      },
      text: {
        primary: '#ebebebff',
        secondary: '#adadadff',
      },
      button: {
        primary: '#dba400',
        secondary: '#a98003ff',
        subTab: {
          prim: '#2b2b2bff',
          second: '#a98003ff',
        },
      },
      shimmer: {
        first: ['#6161617c', '#2b2b2bff', '#6161617c'],
        second: ['#2b2b2bff', '#6161617c', '#2b2b2bff'],
      },
      bottomTab: {
        color: '#dba400',
        items: {
          primary: 'black',
          secondary: 'lightgray',
        },
      },
      subTab: {
        color: '#2b2b2bff',
        items: {
          primary: 'white',
          secondary: 'gray',
        },
      },
    },

    lightColors: {
      primary: '#eaeaeaff',
      secondary: 'white',
      exm: '#282a3a',

      opacity: {
        images: '#6e6e6e98',
      },
      text: {
        primary: '#181818ff',
        secondary: '#494949ff',
      },
      button: {
        primary: '#dba400',
        secondary: '#a98003ff',
        subTab: {
          primary: '#dba400',
          secondary: '#a98003ff',
        },
      },
      shimmer: {
        colors: ['#eaeaeaff', 'white', '#eaeaeaff'],
      },
      bottomTab: {
        color: '#dba400',
        items: {
          primary: 'black',
          secondary: 'black',
        },
      },
      subTab: {
        color: 'white',
        items: {
          primary: 'black',
          secondary: 'gray',
        },
      },
    },
  };

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

  useEffect(() => {
    setColors(
      currentTheme === THEME_DARK
        ? colorsList.darkColors
        : colorsList.lightColors,
    );
  }, [currentTheme]);

  // const [userXp, setUserXp] = useAsyncStorageState<number>('UserXp', 0);
  // const [userOnline, setUserOnline] = useAsyncStorageState<boolean>('UserOnline', false);
  // const [language, setLanguage] = useAsyncStorageState<string>('Language', 'english');
  // const [globTrueAns, setGlobTrueAns] = useAsyncStorageState<number>('GlobTrueAns', 0);
  // const [globFalseAns, setGlobFalseAns] = useAsyncStorageState<number>('GlobFalseAns', 0);
  // const [isGradient, setIsGradient] = useAsyncStorageState<boolean>('Gradient', false);
  // const [userName, setUserName] = useAsyncStorageState<string>('UserName', '');
  // const [userImage, setUserImage] = useAsyncStorageState<string | null>('UserImage', null);
  // const [vibrate, setVibrate] = useAsyncStorageState<boolean>('Vibrate', true);
  // const [sound, setSound] = useAsyncStorageState<boolean>('Sound', true);
  // const [speed, setSpeed] = useAsyncStorageState<number>('Speed', 0);
  // const [userPlan, setUserPlan] = useAsyncStorageState<string>('userPlan', '');

  type Language = 'arabic' | 'english';
  type LanguageTexts = typeof languagesList.arabic; // Infers all text properties

  // Then fix:
  const texts: LanguageTexts = languagesList[language as Language];

  const [colors, setColors] = useState<typeof colorsList.darkColors>(
    colorsList.darkColors,
  );

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

  // useEffect(() => {
  //   // console.log('Firebase sync check:', {
  //   //   firebaseLoaded,
  //   //   hasUid: !!user?.uid,
  //   //   dataAsync,
  //   //   bookmarksChanged: JSON.stringify(bookmarks)
  //   // });
  //   if (!user?.uid || dataAsync) return;
  //   const dataToUpdate = {
  //     UserName: userName,
  //     userImage: userImage,
  //     UserOnline: userOnline,
  //     UserXp: userXp,
  //     Speed: speed,
  //     Language: language,
  //     GlobTrueAns: globTrueAns,
  //     GlobFalseAns: globFalseAns,
  //     Gradient: isGradient,
  //     Vibrate: vibrate,
  //     Sound: sound,
  //     userPlan: userPlan,
  //     CurrentTheme: currentTheme,
  //     QuestionsItemsIndex: questionsItemsIndex,
  //   };

  //   // FIXED: Only update if data actually changed
  //   if (JSON.stringify(prevDataRef.current) !== JSON.stringify(dataToUpdate)) {
  //     prevDataRef.current = dataToUpdate;

  //     setDataAsync(true);
  //     update(ref(database, `users/${user.uid}`), dataToUpdate)
  //       .then(() => {
  //         const now = new Date().toISOString();
  //         console.log(`[${now}] Data updated successfully`);
  //       })
  //       .catch(error => console.error('Failed to update data:', error))
  //       .finally(() => setDataAsync(false));
  //   }
  // }, [user?.uid, dataAsync,
  //   questionsItemsIndex, currentTheme, userName, userImage, userXp, userOnline, speed, language,
  //   globTrueAns, globFalseAns, isGradient, vibrate, sound,
  //   dataLevelIndex, userPlan
  // ]);

  // FIXED Logout

  const dataToUpdate = useMemo(
    () => ({
      UserName: userName,
      userImage: userImage,
      UserOnline: userOnline,
      UserXp: userXp,
      GlobTrueAns: globTrueAns,
      GlobFalseAns: globFalseAns,
      userPlan: userPlan,
    }),
    [
      userName,
      userImage,
      userOnline,
      userXp,
      globTrueAns,
      globFalseAns,
      userPlan,
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
    'UserOnline',
    'UserXp',
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
        unsubscribeLessonsListener.current?.();
        unsubscribeExamsListener.current?.();
        // unsubscribeUsersListener.current?.();
        unsubscribeUserListener.current?.();
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
      unsubscribeExamsListener,
      // unsubscribeUsersListener,
      unsubscribeUserListener,
      userPlan,
      setUserPlan,
      quizCategoriesData,
      leaderBoardIcon,
      setLeaderBoardIcon,
      speed,
      setSpeed,
      userXp,
      setUserXp,
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
      colors,
      setColors,
      currentTheme,
      setCurrentTheme,
      THEME_DARK,
      THEME_LIGHT,
      isRewardAdd,
      setIsRewardAdd,
      vibrate,
      setVibrate,
      sound,
      setSound,
      colorsList,
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
      imgBase
    }),
    [
      questionsItemsIndex,
      signsItemsIndex,
      priorityItemsIndex,
      lessonsData,
      examsData,
      colors,
      currentTheme,
      userName,
      userImage,
      vibrate,
      sound,
      language,
      userXp,
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
