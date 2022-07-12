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
        <span className="material-symbols-outlined">first_page</span>
      </button>
      <button
        className="navigator__btn"
        type="button"
        onClick={handleDecrementPage}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <span className="navigator__display">{`${page} of ${objectInfo.pages}`}</span>
      <button
        className="navigator__btn"
        type="button"
        onClick={handleIncrementPage}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
      <button
        className="navigator__btn"
        type="button"
        onClick={() => setPage(objectInfo.pages)}
      >
        <span className="material-symbols-outlined">last_page</span>
      </button>
    </div>
  );
}

export default PageNavigator;
