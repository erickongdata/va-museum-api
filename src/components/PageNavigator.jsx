import { useContext } from 'react';
import { AppContext } from '../AppContext';

function PageNavigator() {
  const { page, objectInfo, handleIncrementPage, handleDecrementPage } =
    useContext(AppContext);
  return (
    <div>
      <button type="button" onClick={handleDecrementPage}>
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <span>{`${page} of ${objectInfo.pages}`}</span>
      <button type="button" onClick={handleIncrementPage}>
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
}

export default PageNavigator;
