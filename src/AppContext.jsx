import { createContext, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// import axios from 'axios';
import useLocalStorage from './hooks/useLocalStorage';
import useFetchRecords from './hooks/useFetchRecords';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [isManifestPresent, setIsManifestPresent] = useState(true);
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', []);
  const [bookmarksPage, setBookmarksPage] = useState(1);
  const [myGalleryLayout, setMyGalleryLayout] = useState('column');
  const [galleryLayout, setGalleryLayout] = useState('column');
  const perPage = 15;

  const searchUrl = `https://api.vam.ac.uk/v2/objects/search?q=${searchParams.get(
    'query'
  )}&page=${searchParams.get('page')}&page_size=15&images_exist=true`;

  const { objectInfo, objectRecords, isRecordsLoaded, searchError } =
    useFetchRecords(searchUrl, searchParams.get('query'), searchParams);

  async function handleIncrementPage() {
    const prevPage = +searchParams.get('page');
    const page = prevPage < objectInfo.pages ? prevPage + 1 : prevPage;
    searchParams.set('page', page);
    setSearchParams(searchParams);
  }

  async function handleDecrementPage() {
    const prevPage = +searchParams.get('page');
    const page = prevPage > 1 ? prevPage - 1 : prevPage;
    searchParams.set('page', page);
    setSearchParams(searchParams);
  }

  const handleIncrementBookmarksPage = () => {
    const pages = Math.ceil(bookmarks.length / perPage);
    setBookmarksPage((prevPage) =>
      prevPage < pages ? prevPage + 1 : prevPage
    );
  };

  const handleDecrementBookmarksPage = () => {
    setBookmarksPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  function handleToggleBookmark(
    imageBaseUrl,
    title,
    artist,
    date,
    systemNumber,
    manifestUrl
  ) {
    const bookmarkObj = {
      systemNumber,
      imageBaseUrl,
      title,
      artist,
      date,
      manifestUrl,
    };

    setBookmarks((currBookmarks) => {
      if (
        currBookmarks.find((book) => book.systemNumber === systemNumber) ===
        undefined
      ) {
        return [...currBookmarks, bookmarkObj];
      }
      return currBookmarks.filter((book) => book.systemNumber !== systemNumber);
    });
  }

  useEffect(() => {
    // Go to next last page when deleting all images from last page of bookmarks
    const pages = Math.ceil(bookmarks.length / perPage);
    if (bookmarksPage > pages && bookmarksPage >= 2)
      setBookmarksPage((curr) => curr - 1);
  }, [bookmarks]);

  const context = useMemo(
    () => ({
      objectInfo,
      objectRecords,
      handleIncrementPage,
      handleDecrementPage,
      isRecordsLoaded,
      searchParams,
      setSearchParams,
      bookmarks,
      setBookmarks,
      handleToggleBookmark,
      bookmarksPage,
      setBookmarksPage,
      handleIncrementBookmarksPage,
      handleDecrementBookmarksPage,
      perPage,
      myGalleryLayout,
      setMyGalleryLayout,
      galleryLayout,
      setGalleryLayout,
      isManifestPresent,
      setIsManifestPresent,
      searchError,
    }),
    [
      objectInfo,
      objectRecords,
      isRecordsLoaded,
      searchParams,
      bookmarks,
      bookmarksPage,
      perPage,
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
