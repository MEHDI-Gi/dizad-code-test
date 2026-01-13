// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyAIDbLbeM5YG56b4GVBEA8UVPDBHcbP1q8",
//   authDomain: "quiz-app-ar-44188.firebaseapp.com",
//   databaseURL: "https://quiz-app-ar-44188-default-rtdb.firebaseio.com",
//   projectId: "quiz-app-ar-44188",
//   storageBucket: "quiz-app-ar-44188.appspot.com",
//   messagingSenderId: "673349277804",
//   appId: "1:673349277804:web:487b78f8b192eaa97be049",
//   measurementId: "G-1NTMLHL3Z3"
// };

// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage)
// });
// export { database, auth };
import { getApp, initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

let app;
try {
    app = getApp(); // get default app if exists
} catch (error) {
    // initialize if no app exists yet (rare in native RN)
    app = initializeApp();
}

const db = database(app);
const authInstance = auth(app);

export { db as database, authInstance as auth, app };
