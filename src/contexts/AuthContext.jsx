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
  updateProfile,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import useLocalStorage from '../hooks/useLocalStorage';
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
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', []);
  const [bookmarksPage, setBookmarksPage] = useState(1);
  const perPage = 15;

  const handleIncrementBookmarksPage = () => {
    const pages = Math.ceil(bookmarks.length / perPage);
    setBookmarksPage((prevPage) =>
      prevPage < pages ? prevPage + 1 : prevPage
    );
  };

  const handleDecrementBookmarksPage = () => {
    setBookmarksPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  function handleToggleBookmark(
    imageBaseUrl,
    title,
    artist,
    date,
    systemNumber,
    manifestUrl
  ) {
    const bookmarkObj = {
      systemNumber,
      imageBaseUrl,
      title,
      artist,
      date,
      manifestUrl,
    };

    setBookmarks((currBookmarks) => {
      if (
        currBookmarks.find((book) => book.systemNumber === systemNumber) ===
        undefined
      ) {
        return [...currBookmarks, bookmarkObj];
      }
      return currBookmarks.filter((book) => book.systemNumber !== systemNumber);
    });
  }

  useEffect(() => {
    // Go to next last page when deleting all images from last page of bookmarks
    const pages = Math.ceil(bookmarks.length / perPage);
    if (bookmarksPage > pages && bookmarksPage >= 2)
      setBookmarksPage((curr) => curr - 1);
  }, [bookmarks]);

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function updateUserName(firstName) {
    return updateProfile(auth.currentUser, {
      displayName: firstName,
    });
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
      bookmarks,
      setBookmarks,
      handleToggleBookmark,
      bookmarksPage,
      setBookmarksPage,
      handleIncrementBookmarksPage,
      handleDecrementBookmarksPage,
      perPage,
      currentUser,
      signUp,
      login,
      logout,
      resetPassword,
      updateUserEmail,
      updateUserPassword,
      updateUserName,
    }),
    [currentUser, bookmarks, bookmarksPage]
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
