import { useContext, useState, useRef } from 'react';
import { AppContext } from '../AppContext';

function PageNavigator() {
  const {
    objectInfo,
    handleIncrementPage,
    handleDecrementPage,
    setSearchParams,
    searchParams,
  } = useContext(AppContext);

  const [inputActive, setInputActive] = useState(false);
  const inputBox = useRef();

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value < 1) {
        searchParams.set('page', 1);
        setSearchParams(searchParams);
        setInputActive(false);
        return;
      }
      if (e.target.value > objectInfo.pages) {
        searchParams.set('page', +objectInfo.pages);
        setSearchParams(searchParams);
        setInputActive(false);
        return;
      }
      searchParams.set('page', +e.target.value);
      setSearchParams(searchParams);
      setInputActive(false);
    }
  };

  return (
    <div className="navigator">
      <button
        className="navigator__btn"
        type="button"
        onClick={() => {
          searchParams.set('page', 1);
          setSearchParams(searchParams);
        }}
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
        >{`${searchParams.get('page')} of ${objectInfo.pages}`}</button>
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
        onClick={() => {
          searchParams.set('page', objectInfo.pages);
          setSearchParams(searchParams);
        }}
      >
        <span className="material-symbols-outlined" aria-label="last-page">
          last_page
        </span>
      </button>
    </div>
  );
}

export default PageNavigator;
