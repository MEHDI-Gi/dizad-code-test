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
