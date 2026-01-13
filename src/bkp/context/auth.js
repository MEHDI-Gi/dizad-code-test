// import * as Google from 'expo-auth-session/providers/google';
// import { GoogleAuthProvider, signInWithCredential, signOut, onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebaseConfig';
// import { useEffect, useState } from 'react';

// export function useGoogleSignIn() {
//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//     clientId: "673349277804-1qp5enrdnfj2h02rciu8m9od7gmuugaf.apps.googleusercontent.com",
//     iosClientId: "673349277804-tieq0sdi70d12rsqo90v9jjqpn115nhc.apps.googleusercontent.com",
//     androidClientId: "673349277804-6313dqkemilmumqa2s2f2rn2294lerps.apps.googleusercontent.com",
//     expoClientId: "673349277804-lluvt5di47file2r89op83rcfpf4hfi7.apps.googleusercontent.com",
//   });

//   const [user, setUser] = useState(null);
//   const [initializing, setInitializing] = useState(true);

//   // Listen to Firebase auth state and update user once on startup and later changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       setUser(firebaseUser);
//       if (initializing) setInitializing(false);
//     });
//     return unsubscribe; // Unsubscribe on unmount
//   }, [initializing]);

//   // Respond to Google sign-in response without setting user directly,
//   // as user state is controlled by the above listener
//   useEffect(() => {
//     if (response?.type === 'success') {
//       const { id_token } = response.params;
//       const credential = GoogleAuthProvider.credential(id_token);

//       signInWithCredential(auth, credential).catch(console.error);
//     }
//   }, [response]);

//   const logout = async () => {
//     await signOut(auth);
//     setUser(null);
//     console.log('logout done');
//   };

//   // Expose initializing to allow components to delay UI until auth ready
//   return { user, setUser, initializing, request, promptAsync, logout };
// }



import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithCredential, GoogleAuthProvider, signOut } from '@react-native-firebase/auth';
import { isErrorWithCode, GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// Configure GoogleSignin once at app startup or component mount
GoogleSignin.configure({
  webClientId: '673349277804-v665suusobrd1lgd58sbqoj5vvb748r5.apps.googleusercontent.com',

  offlineAccess: true, // optionally needed for server-side verification
});

const auth = getAuth();

export function useGoogleSignIn() {
  const [user, setUser] = useState(auth.currentUser);
  const [initializing, setInitializing] = useState(true);
  const [authInProgress, setAuthInProgress] = useState(false);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (initializing) setInitializing(false);
    });

    return unsubscribe; // unsubscribe on unmount
  }, [initializing]);

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
