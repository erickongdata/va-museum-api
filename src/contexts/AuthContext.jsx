import { createContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
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
import sortFilterBookmarks from '../utilities/sortFilterBookmarks';

// init firebase
initializeApp(firebaseConfig);
// init services
const auth = getAuth();
const db = getFirestore();

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', []);
  const [bookmarksPage, setBookmarksPage] = useState(1);
  const [bookmarksSort, setBookmarksSort] = useState('date');
  const perPage = 15;

  const filteredBookmarks = useMemo(
    () => sortFilterBookmarks(bookmarks, bookmarksSort),
    [bookmarks, bookmarksSort]
  );

  const pages = Math.ceil(filteredBookmarks.length / perPage);

  const handleIncrementBookmarksPage = () => {
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
    systemNumber
  ) {
    const bookmarkObj = {
      systemNumber,
      imageBaseUrl,
      title,
      artist,
      date,
    };

    // If user is present, changes are made directly with firestore database
    if (currentUser) {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      if (
        bookmarks.find((book) => book.systemNumber === systemNumber) ===
        undefined
      ) {
        // Add bookmark
        const data = { data: arrayUnion(bookmarkObj) };
        updateDoc(docRef, data).catch((error) => console.log(error));
        return;
      }
      // Remove bookmark
      const data = { data: arrayRemove(bookmarkObj) };
      updateDoc(docRef, data).catch((error) => console.log(error));
      return;
    }

    // If no user, this changes State.
    setBookmarks((currBookmarks) => {
      if (
        currBookmarks.find((book) => book.systemNumber === systemNumber) ===
        undefined
      ) {
        // Add bookmark
        return [...currBookmarks, bookmarkObj];
      }
      // Remove bookmark
      return currBookmarks.filter((book) => book.systemNumber !== systemNumber);
    });
  }

  // Go to next last page when deleting all images from last page of bookmarks
  useEffect(() => {
    if (bookmarksPage > pages && bookmarksPage >= 2)
      setBookmarksPage((curr) => curr - 1);
  }, [filteredBookmarks]);

  // Initialize User bookmarks doc data when signing up for first time
  function initializeDocData() {
    const docRef = doc(db, 'users', auth.currentUser.uid);
    const data = { user: auth.currentUser.uid, data: bookmarks };
    setDoc(docRef, data);
    console.log('data initialized');
  }

  // Subscribe to User change
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribeAuth;
  }, []);

  // Subscribe to Doc changes component moved to inside Navbar

  // User login/logout/sign-up Firebase functions
  // ----------------------------------------------------------
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
      initializeDocData,
      db,
      bookmarksSort,
      setBookmarksSort,
      filteredBookmarks,
    }),
    [
      currentUser,
      bookmarks,
      bookmarksPage,
      db,
      bookmarksSort,
      filteredBookmarks,
    ]
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
