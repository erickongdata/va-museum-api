import { createContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { initializeApp } from 'firebase/app';
// import {
// getFirestore,
// setDoc,
// doc,
// updateDoc,
// getDoc,
// } from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import firebaseConfig from '../firebase/firebaseConfig';

// init firebase
initializeApp(firebaseConfig);
// init services
const auth = getAuth();
// const db = getFirestore();

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUserEmail(newEmail) {
    return updateEmail(currentUser, newEmail);
  }

  function updateUserPassword(newPassword) {
    return updatePassword(currentUser, newPassword);
  }

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribeAuth;
  }, []);

  const context = useMemo(
    () => ({
      currentUser,
      signUp,
      login,
      logout,
      resetPassword,
      updateUserEmail,
      updateUserPassword,
    }),
    [currentUser]
  );

  return (
    <AuthContext.Provider value={context}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
