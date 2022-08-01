import { useContext, useState } from 'react';
import { AppContext } from '../AppContext';
import PageNavigator from './PageNavigator';

function GalleryPageNavigator() {
  const {
    objectInfo,
    handleIncrementPage,
    handleDecrementPage,
    setSearchParams,
    searchParams,
  } = useContext(AppContext);

  const [inputActive, setInputActive] = useState(false);

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

  const goFirstPage = () => {
    searchParams.set('page', 1);
    setSearchParams(searchParams);
  };

  const goLastPage = () => {
    searchParams.set('page', objectInfo.pages);
    setSearchParams(searchParams);
  };

  return (
    <PageNavigator
      goFirstPage={goFirstPage}
      goLastPage={goLastPage}
      decrementPage={handleDecrementPage}
      incrementPage={handleIncrementPage}
      inputActive={inputActive}
      setInputActive={setInputActive}
      handleInput={handleInput}
      page={+searchParams.get('page')}
      pages={+objectInfo.pages}
    />
  );
}

export default GalleryPageNavigator;
