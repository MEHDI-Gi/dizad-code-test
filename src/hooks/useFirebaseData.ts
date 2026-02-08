// hooks/useFirebaseListeners.ts
import { useEffect } from 'react';
import { ref, onValue, update } from '@react-native-firebase/database';
import { database, auth } from '../context/firebaseConfig';

export const useFirebaseData = (
    user: any,
    setters: {
        setLessonsData: (data: any) => void;
        setLessonsLoaded: (val: boolean) => void;
        setExamsData: (data: any) => void;
        setExamsLoaded: (val: boolean) => void;
        setQuizCategoriesData: (data: any) => void;
        setUserData: (data: any) => void; // Pass an object or individual setters
        setUserLoaded: (val: boolean) => void;
        setFirebaseLoaded: (val: boolean) => void;
    }
) => {
    useEffect(() => {
        if (!user?.uid) {
            setters.setFirebaseLoaded(false);
            return;
        }

        const lessonsDataRef = ref(database, '/lessons');
        const examsDataRef = ref(database, '/exams');
        const userDataRef = ref(database, `users/${user.uid}`);

        // 1. Lessons Listener
        const unsubLessons = onValue(lessonsDataRef, snapshot => {
            if (snapshot.val()) setters.setLessonsData(snapshot.val());
            setters.setLessonsLoaded(true);
        }, () => setters.setLessonsLoaded(true));

        // 2. Exams Listener
        const unsubExams = onValue(examsDataRef, snapshot => {
            const fetchedData = snapshot.val();
            if (fetchedData) {
                setters.setQuizCategoriesData(Object.keys(fetchedData));
                setters.setExamsData(fetchedData);
            }
            setters.setExamsLoaded(true);
        }, () => setters.setExamsLoaded(true));

        // 3. User Data Listener
        const unsubUser = onValue(userDataRef, snapshot => {
            const firebaseData = snapshot.val();
            const creationTime = auth.currentUser?.metadata?.creationTime || new Date().toISOString();

            if (firebaseData) {
                if (!firebaseData.firstSignIn) {
                    update(ref(database, `users/${user.uid}`), { firstSignIn: creationTime });
                }
                // Call your context setters here
                setters.setUserData(firebaseData);
            } else {
                const newData = {
                    Username: user.displayName || 'Guest',
                    UserImage: user.photoURL || null,
                    firstSignIn: creationTime,
                    UserPlan: 'free',
                };
                update(ref(database, `users/${user.uid}`), newData);
            }
            setters.setUserLoaded(true);
        }, () => setters.setUserLoaded(true));

        // CLEANUP: This replaces your useRef logic
        return () => {
            unsubLessons();
            unsubExams();
            unsubUser();
        };
    }, [user?.uid]);
};