import { createContext, useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import useLocalStorage from './hooks/useLocalStorage';

function handleError(err) {
  console.log(err);
}

async function fetchJsonData(url) {
  const response = await fetch(url);

  if (response.status === 200) {
    const json = await response.json();
    return json;
  }

  throw new Error(response.status);
}

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [objectInfo, setObjectInfo] = useLocalStorage('objectInfo', {});
  const [objectRecords, setObjectRecords] = useLocalStorage(
    'objectRecords',
    []
  );
  const [objectManifest, setObjectManifest] = useLocalStorage(
    'objectManifest',
    {}
  );
  const [manifestPending, setManifestPending] = useState(false);
  const [recordsPending, setRecordsPending] = useState(false);
  const inputElement = useRef();
  const [bookmarks, setBookmarks] = useState([]);

  const searchUrl = `https://api.vam.ac.uk/v2/objects/search?q=${searchParams.get(
    'query'
  )}&page=${searchParams.get('page')}&page_size=15&images_exist=true`;

  async function fetchRecords() {
    if (!searchParams.get('query')) {
      // console.log('Search term is blank');
      return;
    }
    setRecordsPending(true);
    // console.log('records pending...');

    const objectData = await fetchJsonData(searchUrl).catch(handleError);

    if (!objectData) {
      // console.log('Records fetch failed!');
      if (objectRecords.length !== 0) setObjectRecords([]);
      setRecordsPending(false);
      return;
    }
    setObjectInfo(objectData.info);
    setObjectRecords(objectData.records);
    // console.log('Records fetch success!');
    setRecordsPending(false);
  }

  async function fetchManifest(url) {
    if (url === '') {
      if (Object.keys(objectManifest).length !== 0) setObjectManifest({});
      return;
    }
    setManifestPending(true);

    const manifestData = await fetchJsonData(url).catch(handleError);

    if (!manifestData) {
      // console.log('Manifest fetch failed!');
      if (Object.keys(objectManifest).length !== 0) setObjectManifest({});
      setManifestPending(false);
      return;
    }
    setObjectManifest(manifestData);
    // console.log('Manifest fetch success!');
    setManifestPending(false);
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

  // Refresh when navigating pages
  useEffect(() => {
    console.log(`page changed! to ${searchParams.get('page')}`);
    console.log(`SearchParams changed to ${searchParams.get('query')}`);
    fetchRecords();
  }, [searchParams]);

  // Reset to page 1 if searchTerm is changed when navigating pages and current page > pages
  useEffect(() => {
    const page = searchParams.get('page');
    if (page === null) return;
    if (page > objectInfo.pages || page < 1) {
      searchParams.set('page', 1);
      setSearchParams(searchParams);
    }
  }, [objectInfo]);

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
      manifestPending,
      recordsPending,
      searchParams,
      setSearchParams,
      inputElement,
      bookmarks,
      setBookmarks,
      handleToggleBookmark,
    }),
    [
      objectInfo,
      objectRecords,
      objectManifest,
      manifestPending,
      recordsPending,
      searchParams,
      inputElement,
      bookmarks,
    ]
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
