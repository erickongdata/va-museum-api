import { createContext, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAxios from '../hooks/useAxios';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [isManifestPresent, setIsManifestPresent] = useState(true);
  const [myGalleryLayout, setMyGalleryLayout] = useState('column');
  const [galleryLayout, setGalleryLayout] = useState('column');

  const searchUrl = `https://api.vam.ac.uk/v2/objects/search?q=${searchParams.get(
    'query'
  )}&page=${searchParams.get('page')}&page_size=15&images_exist=true`;

  // Custom Axios hook
  const {
    data: objectData,
    error: searchError,
    loaded: isObjectDataLoaded,
  } = useAxios(
    searchUrl,
    'GET',
    null,
    { info: {}, records: [] },
    searchParams.get('query'),
    searchParams
  );

  async function handleIncrementPage() {
    const prevPage = +searchParams.get('page');
    const page = prevPage < objectData.info.pages ? prevPage + 1 : prevPage;
    searchParams.set('page', page);
    setSearchParams(searchParams);
  }

  async function handleDecrementPage() {
    const prevPage = +searchParams.get('page');
    const page = prevPage > 1 ? prevPage - 1 : prevPage;
    searchParams.set('page', page);
    setSearchParams(searchParams);
  }

  const context = useMemo(
    () => ({
      objectData,
      isObjectDataLoaded,
      handleIncrementPage,
      handleDecrementPage,
      searchParams,
      setSearchParams,
      myGalleryLayout,
      setMyGalleryLayout,
      galleryLayout,
      setGalleryLayout,
      isManifestPresent,
      setIsManifestPresent,
      searchError,
    }),
    [
      objectData,
      isObjectDataLoaded,
      searchParams,
      galleryLayout,
      myGalleryLayout,
      isManifestPresent,
      searchError,
    ]
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
