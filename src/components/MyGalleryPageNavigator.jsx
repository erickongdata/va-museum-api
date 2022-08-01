import { useContext, useState, useRef } from 'react';
import { AppContext } from '../AppContext';

function MyGalleryPageNavigator() {
  const {
    bookmarks,
    bookmarksPage,
    setBookmarksPage,
    handleDecrementBookmarksPage,
    handleIncrementBookmarksPage,
    perPage,
  } = useContext(AppContext);
  const [inputActive, setInputActive] = useState(false);
  const inputBox = useRef();
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
    <div className="navigator">
      <button
        className="navigator__btn"
        type="button"
        onClick={() => {
          setBookmarksPage(1);
        }}
      >
        <span className="material-symbols-outlined" aria-label="first-page">
          first_page
        </span>
      </button>
      <button
        className="navigator__btn"
        type="button"
        onClick={handleDecrementBookmarksPage}
      >
        <span className="material-symbols-outlined" aria-label="previous-page">
          navigate_before
        </span>
      </button>
      {inputActive ? (
        <input
          className="navigator__input"
          type="number"
          min="1"
          max="9999"
          ref={inputBox}
          onKeyDown={handleInput}
        />
      ) : (
        <button
          type="button"
          className="navigator__display"
          onClick={() => {
            setInputActive(true);
            setTimeout(() => {
              inputBox.current.focus();
            }, 200);
          }}
        >{`${bookmarksPage} of ${pages}`}</button>
      )}

      <button
        className="navigator__btn"
        type="button"
        onClick={handleIncrementBookmarksPage}
      >
        <span className="material-symbols-outlined" aria-label="next-page">
          navigate_next
        </span>
      </button>
      <button
        className="navigator__btn"
        type="button"
        onClick={() => {
          setBookmarksPage(pages);
        }}
      >
        <span className="material-symbols-outlined" aria-label="last-page">
          last_page
        </span>
      </button>
    </div>
  );
}

export default MyGalleryPageNavigator;
