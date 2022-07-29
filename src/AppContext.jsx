import { createContext, useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function handleError(err) {
  console.log('Catch error');
  console.error(err);
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
  const [objectInfo, setObjectInfo] = useState({});
  const [objectRecords, setObjectRecords] = useState([]);
  const [objectManifest, setObjectManifest] = useState({});
  const [page, setPage] = useState(1);
  const [manifestPending, setManifestPending] = useState(false);
  const [recordsPending, setRecordsPending] = useState(false);
  const inputElement = useRef();

  const searchUrl = `https://api.vam.ac.uk/v2/objects/search?q=${searchParams.get(
    'query'
  )}&page=${page}&page_size=15&images_exist=true`;

  async function fetchRecords() {
    if (!searchParams.get('query')) {
      console.log('Search term is blank');
      return;
    }
    setRecordsPending(true);
    console.log('records pending...');

    const objectData = await fetchJsonData(searchUrl).catch(handleError);

    if (!objectData) {
      console.log('Records fetch failed!');
      if (objectRecords.length !== 0) setObjectRecords([]);
      setRecordsPending(false);
      return;
    }
    setObjectInfo(objectData.info);
    setObjectRecords(objectData.records);
    console.log('Records fetch success!');
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
      console.log('Manifest fetch failed!');
      if (Object.keys(objectManifest).length !== 0) setObjectManifest({});
      setManifestPending(false);
      return;
    }
    setObjectManifest(manifestData);
    console.log('Manifest fetch success!');
    setManifestPending(false);
  }

  async function handleIncrementPage() {
    setPage((currPage) =>
      currPage < objectInfo.pages ? currPage + 1 : currPage
    );
  }

  async function handleDecrementPage() {
    setPage((currPage) => (currPage > 1 ? currPage - 1 : currPage));
  }

  // Refresh when navigating pages
  useEffect(() => {
    console.log(`page changed! to ${page}`);
    console.log(`SearchParams changed to ${searchParams.get('query')}`);
    fetchRecords();
  }, [page, searchParams]);

  // Reset to page 1 if searchTerm is changed when navigating pages and current page > pages
  useEffect(() => {
    if (page > objectInfo.pages) setPage(1);
  }, [objectInfo]);

  useEffect(() => {
    console.log(`objectManifest changed to ${objectManifest.label}`);
  }, [objectManifest]);

  useEffect(() => {
    console.log('objectRecords changed');
  }, [objectRecords]);

  const context = useMemo(
    () => ({
      fetchRecords,
      fetchManifest,
      page,
      setPage,
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
    }),
    [
      objectInfo,
      objectRecords,
      objectManifest,
      page,
      manifestPending,
      recordsPending,
      searchParams,
      inputElement,
    ]
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
