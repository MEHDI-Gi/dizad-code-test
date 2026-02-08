

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithCredential, GoogleAuthProvider, signOut } from '@react-native-firebase/auth';
import { isErrorWithCode, GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// Configure GoogleSignin once at app startup or component mount
GoogleSignin.configure({
  webClientId: '545139079478-ate37f0pbau0mhkv5r356reh1pluljv2.apps.googleusercontent.com',

  offlineAccess: true, // optionally needed for server-side verification
});

const auth = getAuth();

export function useGoogleSignIn() {
  const [user, setUser] = useState<any>(null);
  const [initializing, setInitializing] = useState(true);
  const [authInProgress, setAuthInProgress] = useState(false);

  // ✅ FIXED: Empty deps + proper logic
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setInitializing(false);  // Always set false after FIRST fire
    });

    return unsubscribe;
  }, []);  // ✅ Empty deps!

  const signIn = async () => {
    if (authInProgress) {
      console.log('Sign-in already in progress');
      return;
    }
    setAuthInProgress(true);
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      console.log('Tokens fetched with getTokens():', tokens);

      if (!tokens.idToken) {
        console.error('No idToken received from Google Sign-In');
        return;
      }

      const googleCredential = GoogleAuthProvider.credential(tokens.idToken);
      await signInWithCredential(auth, googleCredential);

    } catch (error) {
      // existing error handling logic...
    } finally {
      setAuthInProgress(false);
    }
  };


  // Logout method
  const logout = async () => {
    try {
      await signOut(auth);
      await GoogleSignin.signOut();
      setUser(null);
      console.log('Logout successful');
    } catch (e) {
      console.error('Logout error', e);
    }
  };

  return { user, initializing, authInProgress, signIn, logout };
}
