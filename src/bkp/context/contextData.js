import React, { createContext, useRef, useState, useEffect } from 'react';
import { AppState, Vibration, } from 'react-native';

// import { database } from './firebaseConfig';
// import { ref, onValue, set } from "firebase/database";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAsyncStorageState } from './useAsyncStorageState';
import { useLives } from './useLives';
// import { Audio } from 'expo-av';
import Sound from 'react-native-sound';
import { useGoogleSignIn } from '../context/auth';
// import { auth } from './firebaseConfig';
import { database, auth } from './firebaseConfig';

import { ref, set, onValue } from '@react-native-firebase/database';

const DataContext = createContext();

const DataProvider = ({ children }) => {

  const { user, initializing, signIn, logout } = useGoogleSignIn();


  const [dataLevelIndex, setDataLevelIndex] = useState(1);
  const [quizCategoriesData, setQuizCategoriesData] = useState({})

  const [usersData, setUsersData] = useState({});
  const [quizData, setQuizData] = useState({});

  const [isLoaded, setIsLoaded] = useState(false);

  const [firebaseLoaded, setFirebaseLoaded] = useState(false);
  const [quizLoaded, setQuizLoaded] = useState(false);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);

  const [globalQuestionsLength, setGobalQuestionsLength] = useState(null)

  const unsubscribeQuizListener = useRef(null);
  const unsubscribeUsersListener = useRef(null);
  const unsubscribeUserListener = useRef(null);

  useEffect(() => {

    const quizDataRef = ref(database, '/quiz');
    const usersDataRef = ref(database, '/users');


    unsubscribeQuizListener.current = onValue(quizDataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      if (fetchedData) {
        const keys = Object.keys(fetchedData);
        setQuizCategoriesData(keys)
        setQuizData(fetchedData);
        console.log('Quiz data loaded');

        // const totalQuestions = Object.values(fetchedData).reduce(
        //   (sum, category) => sum + Object.keys(category || {}).length, 0
        // );
        // setGobalQuestionsLength(totalQuestions)
        setQuizLoaded(true);

      } else {
        console.log('No quiz data');
      }
    });

    unsubscribeUsersListener.current = onValue(usersDataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      if (fetchedData) {
        setUsersData(fetchedData);
        setUsersLoaded(true);
        console.log('Users data loaded');
      } else {
        console.log('No users data');
      }
    });

    if (!user?.uid) {
      setUserLoaded(false);
      // unsubscribeUserListener.current?.();
      console.log('user is false : from 93')
      return;
    }

    const userDataRef = ref(database, `users/${user.uid}`);

    unsubscribeUserListener.current = onValue(userDataRef, (snapshot) => {
      const creationTime = auth.currentUser?.metadata?.creationTime || new Date().toISOString();

      const firebaseData = snapshot.val();
      if (firebaseData) {
        console.log('User data loaded');
        setUserLoaded(true);

        // if (!firebaseData.firstSignIn) {
        //   set(ref(database, `users/${user.uid}/firstSignIn`), creationTime).catch(console.error);
        // }
        if (!firebaseData.firstSignIn && !firstSignInWritten.current) {
          firstSignInWritten.current = true; // prevent loop!
          set(ref(database, `users/${user.uid}/firstSignIn`), creationTime)
            .catch(console.error);
        }
        setUserXp(firebaseData.UserXp ?? 0);
        setUserVip(firebaseData.UserVip ?? '', null);
        setSpeed(firebaseData.Speed ?? 0);
        setUserName(firebaseData.Username ?? '');
        setUserImage(firebaseData.UserImage ?? null);
        setLanguage(firebaseData.Language ?? 'english');
        setGlobTrueAns(firebaseData.GlobTrueAns ?? 0);
        setGlobFalseAns(firebaseData.GlobFalseAns ?? 0);
        setIsGradient(firebaseData.Gradient ?? false);
        setVibrate(firebaseData.Vibrate ?? true);
        setSound(firebaseData.Sound ?? true);
        setHelpPoint(firebaseData.HelpPoint ?? 0);
        setDataLevelIndex(firebaseData.DataLevelIndex ?? 1);
        setQuestIndices(firebaseData.QuestIndices ?? { ct1: 1, ct2: 1, ct3: 1, ct4: 1 });
        setAnswerStats(firebaseData.AnswerStats ?? {
          ct1: { correct: 0, false: 0 },
          ct2: { correct: 0, false: 0 },
          ct3: { correct: 0, false: 0 },
          ct4: { correct: 0, false: 0 }
        });

        AsyncStorage.multiSet([
          ['UserXp', JSON.stringify(firebaseData.UserXp ?? 0)],
          ['Speed', JSON.stringify(firebaseData.Speed ?? 0)],
          ['UserName', JSON.stringify(firebaseData.Username ?? '')],
          ['UserImage', JSON.stringify(firebaseData.UserImage ?? null)],
          ['UserVip', JSON.stringify(firebaseData.UserVip ?? '', null)],
          ['Language', JSON.stringify(firebaseData.Language ?? 'arabic')],
          ['GlobTrueAns', JSON.stringify(firebaseData.GlobTrueAns ?? 0)],
          ['GlobFalseAns', JSON.stringify(firebaseData.GlobFalseAns ?? 0)],
          ['Gradient', JSON.stringify(firebaseData.Gradient ?? false)],
          ['Vibrate', JSON.stringify(firebaseData.Vibrate ?? true)],
          ['Sound', JSON.stringify(firebaseData.Sound ?? true)],
          ['HelpPoint', JSON.stringify(firebaseData.HelpPoint ?? 0)],
          ['LivesHeart', JSON.stringify(firebaseData.LivesHeart ?? 5)],
          ['DataLevelIndex', JSON.stringify(firebaseData.DataLevelIndex ?? 1)],
          ['QuestIndices', JSON.stringify(firebaseData.QuestIndices ?? { lv1: 1, lv2: 1, lv3: 1 })],
          ['AnswerStats', JSON.stringify(firebaseData.AnswerStats ?? { lv1: { correct: 0, false: 0 }, lv2: { correct: 0, false: 0 }, lv3: { correct: 0, false: 0 } })]
        ]).catch(console.error);

      }
    });
    return () => {
      unsubscribeQuizListener.current?.();
      unsubscribeUsersListener.current?.();
      unsubscribeUserListener.current?.();
      console.log('Unsubscribed Firebase listeners');
      setQuizLoaded(false);
      setUsersLoaded(false);
      setUserLoaded(false);
    };
  }, [user?.uid]);

  const firstSignInWritten = useRef(false);
  const lastSavedUserData = useRef({});


  useEffect(() => {
    if (quizLoaded && usersLoaded && userLoaded) {
      setFirebaseLoaded(true);
    } else {
      setFirebaseLoaded(false);
    }
  }, [quizLoaded, usersLoaded, userLoaded]);
  function memberSinceString(firstSignInDateStr) {
    const firstSignInDate = new Date(firstSignInDateStr);
    const now = new Date();

    const years = now.getFullYear() - firstSignInDate.getFullYear();
    const months = now.getMonth() - firstSignInDate.getMonth();
    const days = now.getDate() - firstSignInDate.getDate();

    // Adjust months and years if days negative
    let totalMonths = years * 12 + months;
    if (days < 0) {
      totalMonths -= 1;
    }

    if (totalMonths < 1) {
      return `Member since less than 1 month`;
      console.log(`Years: ${years}, Months: ${months}, Days: ${days}, TotalMonths: ${totalMonths}`);

    } else if (totalMonths === 1) {
      return `Member since 1 month`;
    } else {
      return `Member since ${totalMonths} months`;

    }
  }

  const firstSignInStr = user?.firstSignIn ?? new Date().toISOString();
  const memberSince = memberSinceString(firstSignInStr);

  const dataArray = Object.values(quizData);
  const dataLength = Object.keys(quizData).length;
  const [isPicAdd, setIsPicAdd] = useState(false);
  const [loading, setLoading] = useState(true)
  const [isAccountDeleted, setIsAccountDeleted] = React.useState(null)
  const [snackOptions, setSnackOptions] = useState({ label: '', icon: '' })
  const [loadingOptions, setLoadingOptions] = useState({ label: '', icon: '' })
  const [loadScreen, setLoadScreen] = useState(false)
  let snackVisibility = {
    logout: false,
    accountDeleted: false,
    apparence: false,
    reset: false
  };
  const [isActIndicator, setIsActIndicator] = useState(false);

  const colorsList = {
    darkColors: {
      primary: "#181818ff",
      secondary: "#2b2b2bff",
      profile: {
        background: "#0f1729"
      },
      screenBack: "#0f1729",
      primaryOpacity: "#181818c9",
      answers: "#212f3d",
      buttons: "#274c77",
      priText: 'white',
      secText: 'lightgray',
      quizExitIcon: 'lightgray',
      border: "#2eb8aa",
      nextBtn: '#2e436e',
      settingsItems: "#1d2834",
      gradPri: 'rgba(97, 82, 82, 0.8)',
      gradSec: '#212f3d',

      statsCardBack: "#1c2536",
      statsCardPriText: "white",
      statsCardSecText: "lightgray",

      btmTabBack: "#1c2536",
      btmTabItmFocus: 'lightgray',
      btmTabItmFocusOut: 'gray',

      categoriesCardBack: "#1c2536",
      categoriesCardCover: "#0f1729",
      categoriesCardTitle: "white",
      categoriesCardSubTitle: "lightgray",

      headerBack: "transparent",
    },
    lightColors: {
      profile: {
        background: "#e2e1e4"
      },
      screenBack: "#e2e1e4",
      primary: "lightgray",
      primaryOpatity: "#5c5c5c95",

      secondary: "white",
      answers: "white",
      buttons: "#274c77",
      priText: 'black',
      secText: 'gray',
      quizExitIcon: 'black',
      border: "orange",
      nextBtn: '#2e436e',
      settingsItems: "#1d2834",
      gradPri: 'rgba(242, 234, 234, 0.8)',
      gradSec: 'rgba(142, 138, 138, 0.8)',

      statsCardBack: "white",
      statsCardPriText: "black",
      statsCardSecText: "gray",

      btmTabBack: "white",
      btmTabItmFocus: 'black',
      btmTabItmFocusOut: 'gray',

      categoriesCardBack: "white",
      categoriesCardCover: "lightgray",
      categoriesCardTitle: "black",
      categoriesCardSubTitle: "gray",

      headerBack: "white",

    },
    defaultColors: {
      profile: {
        background: "#0f1729"
      },
      screenBack: "#0f1729",
      primary: "#0f1729",
      primaryOpacity: "#0f1729c4",
      secondary: "#1c2536",
      answers: "#212f3d",
      buttons: "#274c77",
      priText: 'white',
      secText: 'lightgray',
      quizExitIcon: 'lightgray',
      border: "#2eb8aa",
      nextBtn: '#2e436e',
      settingsItems: "#1d2834",
      gradPri: 'rgba(97, 82, 82, 0.8)',
      gradSec: '#212f3d',

      statsCardBack: "#1c2536",
      statsCardPriText: "white",
      statsCardSecText: "lightgray",

      btmTabBack: "#1c2536",
      btmTabItmFocus: 'lightgray',
      btmTabItmFocusOut: 'gray',

      categoriesCardBack: "#1c2536",
      categoriesCardCover: "#0f1729",
      categoriesCardTitle: "white",
      categoriesCardSubTitle: "lightgray",

      headerBack: "transparent",
    },
  }

  const languagesList = {
    arabic: {
      // Profile
      langAr: 'العربية',
      langEn: 'الإنجليزية',
      settingsEdt: 'إعدادات',
      profileEdt: "تعديل الملف الشخصي",
      leaderBoard: 'لوحة المتصدرين',
      langEdt: "اللغة",
      soundEdt: "الصوت",
      vibrateEdt: "الإهتزاز",
      apparenceEdt: "المضهر",
      reportEdt: 'الإبلاغ عن مشكلة',
      reportPlh: 'يمكنك ان تكتب مشكلة هنا ...',
      lang: '',
      reportEdt: "ابلاغ عن مشكلة",
      email: 'البريد الإلكتروني',
      restEdt: "اعادة ضبط",
      deleteEdt: "حذف الحساب",
      logout: "تسجيل الخروج",
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
      logoutDone: 'تم تسجيل الخروج'

    },
    english: {
      // Profile
      langEn: 'English',
      langAr: 'Arabic',
      settingsEdt: 'Settings',
      profileEdt: "Edit Profile",
      leaderBoard: 'Leaderboard',
      langEdt: "Language",
      soundEdt: "Sound",
      vibrateEdt: "Vibrate",
      apparenceEdt: "Appearance",
      reportEdt: "Report Issue",
      restEdt: "Reset",
      reportEdt: 'Report Issue',
      reportPlh: 'Write your report here...',
      email: 'Email',

      deleteEdt: "Delete Account",
      logout: "Logout",
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

      // SnackBars
      languageChanged: 'Language Changed successfully',
      accountDeleted: 'Account Deleted successfully',
      dataReseted: 'Data Reseted successfully',
      themeChanged: 'Theme Changed to',
      logoutDone: "logout successfully"


    },
  };



  const [userXp, setUserXp] = useAsyncStorageState('UserXp', 0);
  const [language, setLanguage] = useAsyncStorageState('Language', 'english');
  const [globTrueAns, setGlobTrueAns] = useAsyncStorageState('GlobTrueAns', 0);
  const [globFalseAns, setGlobFalseAns] = useAsyncStorageState('GlobFalseAns', 0);
  const [isGradient, setIsGradient] = useAsyncStorageState('Gradient', false);
  const [userName, setUserName] = useAsyncStorageState('UserName', '');
  const [userImage, setUserImage] = useAsyncStorageState('UserImage', null);
  const [vibrate, setVibrate] = useAsyncStorageState('Vibrate', true);
  const [sound, setSound] = useAsyncStorageState('Sound', true);
  const [helpPoint, setHelpPoint] = useAsyncStorageState('HelpPoint', 0);
  const [speed, setSpeed] = useAsyncStorageState('Speed', 0);
  const [userVip, setUserVip] = useAsyncStorageState('UserVip', '', false);

  useEffect(() => {
    if (globTrueAns > 0 && globTrueAns % 5 === 0) {
      setHelpPoint(prev => Math.min(prev + 1, 5));
    }
  }, [globTrueAns]);



  useEffect(() => {
    if (userVip) return; // Early return if VIP

    if (globFalseAns > 0 && globFalseAns % 1 === 0 && livesHeart > 0) {
      setLivesHeart(prev => Math.max(prev - 1, 0));
      console.log(`${livesHeart} from global false data context`)
    }
  }, [globFalseAns, userVip, livesHeart]);


  const texts = languagesList[language];
  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';
  const THEME_DEFAULT = 'default';

  const [currentTheme, setCurrentTheme] = useState(THEME_DARK);
  const [colors, setColors] = useState(colorsList.darkColors);

  // Load saved theme on mount
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('Apparence');
      if (savedTheme && [THEME_DARK, THEME_LIGHT, THEME_DEFAULT].includes(savedTheme)) {
        setCurrentTheme(savedTheme);
        setColors(colorsList[`${savedTheme}Colors`]);
      } else {
        // Default theme
        setCurrentTheme(THEME_DARK);
        setColors(colorsList.darkColors);
      }
    };
    loadTheme();
  }, []);

  // Save theme whenever it changes
  useEffect(() => {
    AsyncStorage.setItem('Apparence', currentTheme);
  }, [currentTheme]);






  const allowedUserName = /^(?=.{3,15}$)(?!.* {3})[A-Za-zأ-ي0-9]+( [A-Za-zأ-ي0-9]+){0,2}$/;
  const drawer = useRef(null);
  const answersRef = useRef([]);
  const answersList = [`answer1`, 'answer2', 'answer3'];

  const [levelEndState, setlevelEndState] = useState(false);
  const [timeEndState, setTimeEndState] = useState(false);
  const [exitBtn, setExitBtn] = React.useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [timer, setTimer] = useState(45);
  const timerTimeout = useRef(null)
  // dont forget the timer
  useEffect(() => {
    if (!quizActive) return;
    if (!userVip) {
      if (timer > 0) {
        timerTimeout.current = setTimeout(() => {
          setTimer(prev => prev - 1);
        }, 1000);
        return () => clearTimeout(timerTimeout.current);
      } else if (timer === 0 && !levelEndState) {
        setLivesHeart((prev) => prev - 1);
        console.log(`${livesHeart} from timer dataContext`)
        setTimeEndState(true);
        setExitBtn(false);
        if (vibrate) {
          Vibration.vibrate(200)
        }
      }
    }
  }, [timer, quizActive, userVip]);

  const appState = useRef(AppState.currentState);
  const deadline = useRef(Date.now() + timer * 1000); // deadline timestamp
  const [handleTimerBackground, setHandleTimerBackground] = useState(false);

  // Update timer on app foreground
  // dont forget to fix the timer when the ad is shown or 
  // add only if not add work or the ans is checked
  useEffect(() => {
    if (!handleTimerBackground) {
      const subscription = AppState.addEventListener('change', nextAppState => {
        if (
          appState.current.match(/background|inactive/) &&
          nextAppState === 'active'
        ) {
          // Calculate remaining time
          const remaining = Math.max(0, Math.round((deadline.current - Date.now()) / 1000));
          setTimer(remaining);
        }
        appState.current = nextAppState;
      });

      return () => subscription.remove();
    }
  }, [handleTimerBackground]);

  // When timer or question resets, update deadline accordingly
  const resetTimer = (newTime) => {
    setTimer(newTime);
    deadline.current = Date.now() + newTime * 1000;
  };

  // lives heart state & stored

  const MAX_LIVES = 5;
  const LIFE_RESTORE_INTERVAL = 1 * 60 * 60 * 1000; // 45 minutes in ms

  // function useLives() {
  //   const [livesHeart, setLivesHeart] = useState(MAX_LIVES);
  //   const [livesHeartEnd, setLivesHeartEnd] = useState(false);
  //   const [timeLeft, setTimeLeft] = useState(LIFE_RESTORE_INTERVAL);
  //   const [lastLifeUpdate, setLastLifeUpdate] = useState(Date.now());

  //   // Load lives and last update time from AsyncStorage on mount
  //   useEffect(() => {
  //     async function loadData() {
  //       try {
  //         const livesStored = await AsyncStorage.getItem('LivesHeart');
  //         const lastUpdateStored = await AsyncStorage.getItem('lastLifeUpdate');

  //         const lives = livesStored ? JSON.parse(livesStored) : MAX_LIVES;
  //         setLivesHeart(lives);

  //         const now = Date.now();

  //         if (lastUpdateStored) {
  //           const lastUpdate = parseInt(lastUpdateStored, 10);
  //           setLastLifeUpdate(lastUpdate);

  //           if (lives < MAX_LIVES) {
  //             const elapsed = now - lastUpdate;
  //             const livesToAdd = Math.floor(elapsed / LIFE_RESTORE_INTERVAL);

  //             if (livesToAdd > 0) {
  //               const newLives = Math.min(lives + livesToAdd, MAX_LIVES);
  //               setLivesHeart(newLives);

  //               // Calculate leftover time for next life restore
  //               const remainder = elapsed % LIFE_RESTORE_INTERVAL;
  //               const newLastUpdate = now - remainder;
  //               setLastLifeUpdate(newLastUpdate);
  //               await AsyncStorage.setItem('lastLifeUpdate', newLastUpdate.toString());
  //             }
  //           } else {
  //             // If lives are full, reset lastLifeUpdate to now
  //             setLastLifeUpdate(now);
  //             await AsyncStorage.setItem('lastLifeUpdate', now.toString());
  //           }
  //         } else {
  //           // No last update stored, initialize it
  //           setLastLifeUpdate(now);
  //           await AsyncStorage.setItem('lastLifeUpdate', now.toString());
  //         }
  //       } catch (e) {
  //         console.error('Failed to load lives data', e);
  //       }
  //     }
  //     loadData();
  //   }, []);

  //   // Save livesHeart to AsyncStorage whenever it changes
  //   useEffect(() => {
  //     AsyncStorage.setItem('LivesHeart', JSON.stringify(livesHeart));
  //     setLivesHeartEnd(livesHeart === 0);
  //   }, [livesHeart]);


  //   // Timer to restore one life after the remaining time
  //   useEffect(() => {
  //     if (!userVip) {
  //       if (livesHeart < MAX_LIVES) {
  //         const now = Date.now();
  //         const elapsed = now - lastLifeUpdate;
  //         const timeRemaining = LIFE_RESTORE_INTERVAL - elapsed;

  //         const timerId = setTimeout(async () => {
  //           setLivesHeart(prev => {
  //             const newLives = Math.min(prev + 1, MAX_LIVES);
  //             return newLives;
  //           });
  //           const newLastUpdate = Date.now();
  //           setLastLifeUpdate(newLastUpdate);
  //           await AsyncStorage.setItem('lastLifeUpdate', newLastUpdate.toString());
  //         }, timeRemaining > 0 ? timeRemaining : 0);

  //         return () => clearTimeout(timerId);
  //       } else {
  //         // If lives are full, reset timeLeft to 0
  //         setTimeLeft(0);
  //       }
  //     }

  //   }, [livesHeart, lastLifeUpdate, userVip]);

  //   // Interval to update timeLeft every second
  //   useEffect(() => {
  //     if (!userVip) {
  //       if (livesHeart < MAX_LIVES) {
  //         const intervalId = setInterval(() => {
  //           const now = Date.now();
  //           const elapsed = now - lastLifeUpdate;
  //           const timeRemaining = LIFE_RESTORE_INTERVAL - elapsed;


  //           setTimeLeft(timeRemaining > 0 ? timeRemaining : 0);
  //         }, 1000);

  //         return () => clearInterval(intervalId);
  //       } else {
  //         setTimeLeft(0);
  //       }
  //     }
  //   }, [livesHeart, lastLifeUpdate, userVip]);

  //   useEffect(() => {
  //     if (userVip) {
  //       setLivesHeart(5);
  //     }
  //   }, [userVip]);

  //   return { livesHeart, setLivesHeart, livesHeartEnd, timeLeft };
  // }
  const { livesHeart, livesHeartEnd, timeLeft, setLivesHeart } = useLives();


  const [isRewardAdd, setIsRewardAdd] = useState(false);

  const [levelsRank, setLevelsRank] = useState(null)

  const [questIndices, setQuestIndices] = useState({ ct1: 1, ct2: 1, ct3: 1, ct4: 1 });
  const [answerStats, setAnswerStats] = useState({
    ct1: { correct: 0, false: 0 },
    ct2: { correct: 0, false: 0 },
    ct3: { correct: 0, false: 0 },
    ct4: { correct: 0, false: 0 },
  });
  // Load all indices on mount
  useEffect(() => {
    const loadIndices = async () => {
      const categories = ['ct1', 'ct2', 'ct3', 'ct4'];
      let loaded = {};
      let loadedStats = {};
      for (let category of categories) {
        const stored = await AsyncStorage.getItem(`questIndex_${category}`);
        loaded[category] = stored ? JSON.parse(stored) : 1;
        const storedStats = await AsyncStorage.getItem(`answerStats_${category}`);
        loadedStats[category] = storedStats ? JSON.parse(storedStats) : { correct: 0, false: 0 };
      }
      setQuestIndices(loaded);
      setAnswerStats(loadedStats);
    };
    loadIndices();
  }, []);

  // Save index  when any changes
  useEffect(() => {
    const saveIndices = async () => {
      const pairs = Object.entries(questIndices).map(
        ([category, idx]) => [`questIndex_${category}`, JSON.stringify(idx)]
      );
      await AsyncStorage.multiSet(pairs);
    };
    saveIndices();
  }, [questIndices]);
  const updateQuestIndex = (category, newIndex) => {
    setQuestIndices(prev => ({ ...prev, [category]: newIndex }));
  };
  useEffect(() => {
    const saveStats = async () => {
      const pairs = Object.entries(answerStats).map(
        ([category, stats]) => [`answerStats_${category}`, JSON.stringify(stats)]
      );
      await AsyncStorage.multiSet(pairs);
    };
    saveStats();
  }, [answerStats]);

  const updateAnswerStats = (category, { correct = 0, false: falseCount = 0, time = 0 }) => {
    setAnswerStats(prev => ({
      ...prev,
      [category]: {
        correct: prev[category]?.correct + correct,
        false: prev[category]?.false + falseCount,
      }
    }));
  };

  const resetAnswerStats = (category) => {
    setAnswerStats(prev => ({
      ...prev,
      [category]: { correct: 0, false: 0 }
    }));
  };

  const levelListItemsRef = useRef([]);
  const updateStyleDirectly = (index) => {
    if (levelListItemsRef.current) {
      levelListItemsRef.current.forEach((item, idx) => {
        if (item) {
          item.setNativeProps({
            style: {
              opacity: idx <= index ? 1 : 0.4,
            },
          });
        }
      });
    }
  };

  const [updateNextLevelState, setUpdateNextLevelState] = useState(0)
  useEffect(() => {
    updateStyleDirectly(updateNextLevelState)
  }, [updateNextLevelState])

  const [progressByLevel, setProgressByLevel] = useState({});
  const categoryKey = `ct${dataLevelIndex}`;
  const totalQuestions = Object.keys(quizData?.[categoryKey] || {}).length;
  const currentProgress = questIndices[categoryKey] ? questIndices[categoryKey] - 1 : 0;
  const percentage = totalQuestions > 0 ? (currentProgress / totalQuestions) * 100 : 0;
  // useEffect(() => {
  //   if (questIndices[`lv${dataLevelIndex}`] !== undefined) {
  //     setProgressByLevel(prev => ({
  //       ...prev,
  //       [`lv${dataLevelIndex}`]: questIndices[`lv${dataLevelIndex}`] - 1, // your logic
  //     }));
  //   }
  // }, [questIndices, dataLevelIndex]);
  const currentQuestionsIndex = questIndices[`ct${dataLevelIndex}`];
  const currentLevelIndex = Object.keys(quizData?.[`ct${dataLevelIndex}`] || {}).length;

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

  const sounds = useRef({});

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


  const playSound = key => {
    const sound = sounds.current[key];
    if (sound) sound.play(success => {
      if (!success) console.error(`Failed to play sound "${key}".`);
    });
  };


  const [snackbarState, setSnackbarState] = useState(false)
  const [heartsCard, setHeartsCard] = useState(false)
  const [vipCard, setVipCard] = useState(false)
  const [statisticsCard, setStatisticsCard] = useState(false)
  const [vipPlansCard, setVipPlansCard] = useState(false)


  const [dataAsync, setDataAsync] = useState(false);

  const prevDataRef = useRef();
  useEffect(() => {
    if (!firebaseLoaded || !user?.uid || dataAsync) return; // Prevent during async writes

    const dataToUpdate = {
      UserXp: userXp,
      Speed: speed,
      Username: userName,
      UserImage: userImage,
      Language: language,
      GlobTrueAns: globTrueAns,
      GlobFalseAns: globFalseAns,
      Gradient: isGradient,
      Vibrate: vibrate,
      Sound: sound,
      HelpPoint: helpPoint,
      LivesHeart: livesHeart,
      DataLevelIndex: dataLevelIndex,
      QuestIndices: questIndices,
      AnswerStats: answerStats,
      UserVip: userVip,
    };

    // FIXED: Only update if data actually changed
    if (JSON.stringify(prevDataRef.current) !== JSON.stringify(dataToUpdate)) {
      prevDataRef.current = dataToUpdate;

      setDataAsync(true);
      set(ref(database, `users/${user.uid}`), dataToUpdate)
        .then(() => {
          const now = new Date().toISOString();
          console.log(`[${now}] Data updated successfully`);
        })
        .catch(error => console.error('Failed to update data:', error))
        .finally(() => setDataAsync(false));
    }
  }, [user?.uid, firebaseLoaded, userXp, speed, userName, userImage, language,
    globTrueAns, globFalseAns, isGradient, vibrate, sound, helpPoint,
    livesHeart, dataLevelIndex, questIndices, answerStats, userVip]);

  // FIXED Logout
  const [leaderBoardIcon, setLeaderBoardIcon] = useState(false)


  const [isLogout, setIsLogout] = useState(true)
  const keysToRemove = [
    'UserXp', 'UserVip', 'Speed', 'UserName', 'UserImage', 'Language', 'GlobTrueAns',
    'GlobFalseAns', 'Gradient', 'Vibrate', 'Sound', 'HelpPoint',
    'LivesHeart', 'DataLevelIndex', 'QuestIndices', 'AnswerStats',
    'Apparence', 'lastLifeUpdate',
  ];
  const handleLogout = async (navigation) => {

    try {
      setIsLogout(false)
      unsubscribeQuizListener.current?.();
      unsubscribeUsersListener.current?.();
      unsubscribeUserListener.current?.();

      await logout()
      await AsyncStorage.multiRemove(keysToRemove);

      setFirebaseLoaded(false);
      setQuizLoaded(false);
      setUsersLoaded(false);
      setUserLoaded(false);

      setUserName('');
      setUserImage(null);
      setUserVip('', false);
      setUserXp(0);
      setLivesHeart(5);
      setLanguage('english');
      setSound(true);
      setVibrate(true);
      setHelpPoint(0);
      setGlobTrueAns(0);
      setGlobFalseAns(0);
      setDataLevelIndex(1);
      setQuestIndices({ ct1: 1, ct2: 1, ct3: 1, ct4: 1 });
      setAnswerStats({
        ct1: { correct: 0, false: 0 },
        ct2: { correct: 0, false: 0 },
        ct3: { correct: 0, false: 0 },
        ct4: { correct: 0, false: 0 },
      });
      navigation.navigate('Login')
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLogout(true)
    }
  };



  return (
    <DataContext.Provider
      value={{
        globalQuestionsLength,
        dataAsync,
        isLogout, setIsLogout,
        handleLogout,
        firebaseLoaded,
        setFirebaseLoaded,
        setQuizLoaded,
        setUsersLoaded,
        setUserLoaded,
        unsubscribeQuizListener,
        unsubscribeUsersListener,
        unsubscribeUserListener,
        userVip, setUserVip,
        quizCategoriesData,
        leaderBoardIcon, setLeaderBoardIcon,
        memberSince,
        speed, setSpeed,
        userXp, setUserXp,
        heartsCard, setHeartsCard,
        vipCard, setVipCard,
        statisticsCard, setStatisticsCard,
        vipPlansCard, setVipPlansCard,
        snackbarState, setSnackbarState,
        playSound,
        currentQuestionsIndex, currentLevelIndex,
        // pushToProgress ,setPushToProgress,
        quizData, dataLength, dataArray, usersData,
        dataLevelIndex, setDataLevelIndex,
        questIndices, answerStats, setQuestIndices,
        updateQuestIndex, setAnswerStats,
        updateAnswerStats, resetAnswerStats,
        updateNextLevelState, setUpdateNextLevelState,
        levelListItemsRef,
        updateStyleDirectly,
        percentage,
        livesHeart, setLivesHeart, livesHeartEnd,
        globTrueAns, setGlobTrueAns,
        globFalseAns, setGlobFalseAns,
        helpPoint, setHelpPoint,
        // questIndex, setQuestIndex,
        loading,
        userName, setUserName,
        isPicAdd,
        setIsPicAdd,
        userImage,
        setUserImage,
        answersRef,
        answersList,
        isActIndicator, setIsActIndicator,
        timer, setTimer, resetTimer,
        levelEndState, setlevelEndState,
        timeEndState, setTimeEndState,
        timerTimeout,
        language, setLanguage,
        exitBtn, setExitBtn,
        colors, setColors,
        currentTheme, setCurrentTheme,
        THEME_DARK, THEME_LIGHT, THEME_DEFAULT,
        isRewardAdd, setIsRewardAdd,
        levelsRank, setLevelsRank, MAX_LIVES, livesHeartEnd, timeLeft, livesHeartEnd,
        vibrate, setVibrate,
        sound, setSound,
        setHandleTimerBackground, colorsList,
        isGradient, setIsGradient,
        languagesList, texts,
        isAccountDeleted, setIsAccountDeleted,
        snackVisibility,
        snackOptions, setSnackOptions,
        loadingOptions, setLoadingOptions,
        loadScreen, setLoadScreen,
        setQuizActive
      }}>
      {children}
    </DataContext.Provider>
  );
};
export { DataContext, DataProvider };
