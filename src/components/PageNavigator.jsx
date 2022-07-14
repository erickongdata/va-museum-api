import { useContext, useState, useRef } from 'react';
import { AppContext } from '../AppContext';

function PageNavigator() {
  const {
    page,
    objectInfo,
    handleIncrementPage,
    handleDecrementPage,
    setPage,
  } = useContext(AppContext);

  const [inputActive, setInputActive] = useState(false);
  const inputBox = useRef();

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value < 1) {
        setPage(1);
        setInputActive(false);
        return;
      }
      if (e.target.value > objectInfo.pages) {
        setPage(objectInfo.pages);
        setInputActive(false);
        return;
      }
      setPage(e.target.value);
      setInputActive(false);
    }
  };

  return (
    <div className="navigator">
      <button
        className="navigator__btn"
        type="button"
        onClick={() => setPage(1)}
      >
        <span className="material-symbols-outlined" aria-label="first-page">
          first_page
        </span>
      </button>
      <button
        className="navigator__btn"
        type="button"
        onClick={handleDecrementPage}
      >
        <span className="material-symbols-outlined" aria-label="previous-page">
          navigate_before
        </span>
      </button>
      {inputActive ? (
        <input
          className="navigator__input"
          type="number"
          // placeholder={`${page} of ${objectInfo.pages}`}
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
        >{`${page} of ${objectInfo.pages}`}</button>
      )}

      <button
        className="navigator__btn"
        type="button"
        onClick={handleIncrementPage}
      >
        <span className="material-symbols-outlined" aria-label="next-page">
          navigate_next
        </span>
      </button>
      <button
        className="navigator__btn"
        type="button"
        onClick={() => setPage(objectInfo.pages)}
      >
        <span className="material-symbols-outlined" aria-label="last-page">
          last_page
        </span>
      </button>
    </div>
  );
}

export default PageNavigator;
