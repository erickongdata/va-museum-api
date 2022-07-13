import { useContext } from 'react';
import { AppContext } from '../AppContext';

function PageNavigator() {
  const {
    page,
    objectInfo,
    handleIncrementPage,
    handleDecrementPage,
    setPage,
  } = useContext(AppContext);
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
      <span className="navigator__display">{`${page} of ${objectInfo.pages}`}</span>
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
