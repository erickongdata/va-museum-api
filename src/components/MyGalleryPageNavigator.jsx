import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import PageNavigator from './PageNavigator';

function MyGalleryPageNavigator() {
  const {
    bookmarks,
    bookmarksPage,
    setBookmarksPage,
    handleDecrementBookmarksPage,
    handleIncrementBookmarksPage,
    perPage,
  } = useContext(AuthContext);
  const [inputActive, setInputActive] = useState(false);
  const pages = Math.ceil(bookmarks.length / perPage);

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value < 1) {
        setBookmarksPage(1);
        setInputActive(false);
        return;
      }
      if (e.target.value > pages) {
        setBookmarksPage(pages);
        setInputActive(false);
        return;
      }
      setBookmarksPage(+e.target.value);
      setInputActive(false);
    }
  };

  return (
    <PageNavigator
      goFirstPage={() => setBookmarksPage(1)}
      goLastPage={() => setBookmarksPage(pages)}
      decrementPage={handleDecrementBookmarksPage}
      incrementPage={handleIncrementBookmarksPage}
      inputActive={inputActive}
      setInputActive={setInputActive}
      handleInput={handleInput}
      page={bookmarksPage}
      pages={pages}
    />
  );
}

export default MyGalleryPageNavigator;
