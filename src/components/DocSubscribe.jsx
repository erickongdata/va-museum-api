import { useContext, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../contexts/AuthContext';

function DocSubscribe() {
  const { currentUser, setBookmarks, db } = useContext(AuthContext);
  // Monitor Real-time doc changes and update State
  useEffect(() => {
    const docRef = doc(db, 'users', currentUser.uid);
    const unsubscribeDoc = onSnapshot(docRef, (dataDoc) => {
      setBookmarks(dataDoc?.data()?.data ?? []);
    });

    return unsubscribeDoc;
  }, []);
}

export default DocSubscribe;
