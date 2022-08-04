import { createContext, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import useLocalStorage from './hooks/useLocalStorage';

function handleError(err) {
  console.log(err);
}

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [objectInfo, setObjectInfo] = useState({});
  const [objectRecords, setObjectRecords] = useState([]);
  const [objectManifest, setObjectManifest] = useState({});
  const [isManifestPending, setIsManifestPending] = useState(false);
  const [isRecordsPending, setIsRecordsPending] = useState(false);
  const [isManifestPresent, setIsManifestPresent] = useState(true);
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', []);
  const [bookmarksPage, setBookmarksPage] = useState(1);
  const [myGalleryLayout, setMyGalleryLayout] = useState('column');
  const [galleryLayout, setGalleryLayout] = useState('column');
  const perPage = 15;

  const searchUrl = `https://api.vam.ac.uk/v2/objects/search?q=${searchParams.get(
    'query'
  )}&page=${searchParams.get('page')}&page_size=15&images_exist=true`;

  async function fetchRecords() {
    if (!searchParams.get('query')) {
      // console.log('Search term is blank');
      return;
    }
    setIsRecordsPending(true);
    // console.log('records pending...');

    const response = await axios.get(searchUrl).catch(handleError);

    if (!response) {
      // console.log('Records fetch failed!');
      if (objectRecords.length !== 0) setObjectRecords([]);
      setIsRecordsPending(false);
      return;
    }

    const objectData = response.data;
    setObjectInfo(objectData.info);
    setObjectRecords(objectData.records);
    // console.log('Records fetch success!');
    setIsRecordsPending(false);
  }

  async function fetchManifest(url) {
    if (url === '') {
      if (Object.keys(objectManifest).length !== 0) setObjectManifest({});
      return;
    }
    setIsManifestPending(true);

    const response = await axios.get(url).catch(handleError);

    if (!response) {
      // console.log('Manifest fetch failed!');
      if (Object.keys(objectManifest).length !== 0) setObjectManifest({});
      setIsManifestPending(false);
      return;
    }
    const manifestData = response.data;
    setObjectManifest(manifestData);
    // console.log('Manifest fetch success!');
    setIsManifestPending(false);
  }

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

  useEffect(() => {
    // console.log(`page changed! to ${searchParams.get('page')}`);
    // console.log(`SearchParams changed to ${searchParams.get('query')}`);
    fetchRecords();
  }, [searchParams]);

  // useEffect(() => {
  //   console.log(`objectManifest changed to ${objectManifest.label}`);
  // }, [objectManifest]);

  // useEffect(() => {
  //   console.log('objectRecords changed');
  // }, [objectRecords]);

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
      fetchRecords,
      fetchManifest,
      objectInfo,
      objectRecords,
      objectManifest,
      setObjectInfo,
      setObjectRecords,
      setObjectManifest,
      handleIncrementPage,
      handleDecrementPage,
      isManifestPending,
      isRecordsPending,
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
    }),
    [
      objectInfo,
      objectRecords,
      objectManifest,
      isManifestPending,
      isRecordsPending,
      searchParams,
      bookmarks,
      bookmarksPage,
      perPage,
      galleryLayout,
      myGalleryLayout,
      isManifestPresent,
    ]
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
