import { createContext, useState, useMemo, useEffect } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [objectInfo, setObjectInfo] = useState({});
  const [objectRecords, setObjectRecords] = useState([]);
  const [objectManifest, setObjectManifest] = useState({});
  const [page, setPage] = useState(1);
  const [manifestPending, setManifestPending] = useState(false);
  const [recordsPending, setRecordsPending] = useState(false);
  const searchUrl = `https://api.vam.ac.uk/v2/objects/search?q=${searchTerm}&page=${page}&page_size=15&images_exist=true`;

  async function fetchRecords() {
    if (searchTerm === '') {
      setObjectInfo({});
      setObjectRecords([]);
      return;
    }
    setRecordsPending(true);

    const objectData = await fetchJsonData(searchUrl).catch(handleError);

    if (!objectData) {
      console.log('Records fetch failed!');
      setObjectRecords([]);
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
      setObjectManifest({});
      return;
    }
    setManifestPending(true);

    const manifestData = await fetchJsonData(url).catch(handleError);

    if (!manifestData) {
      console.log('Manifest fetch failed!');
      setObjectManifest({});
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

  useEffect(() => {
    console.log('page changed!');
    fetchRecords();
  }, [page]);

  useEffect(() => {
    console.log(`objectManifest changed to ${objectManifest.label}`);
  }, [objectManifest]);

  useEffect(() => {
    console.log('objectRecords changed');
  }, [objectRecords]);

  // Reset to page 1 if searchTerm is changed when navigating pages and current page > pages
  useEffect(() => {
    if (page > objectInfo.pages) setPage(1);
  }, [objectInfo]);

  const context = useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
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
    }),
    [
      searchTerm,
      objectInfo,
      objectRecords,
      objectManifest,
      page,
      manifestPending,
      recordsPending,
    ]
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
