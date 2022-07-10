/* eslint no-underscore-dangle: 0 */

import { createContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import manifestBlank from './data/manifestBlank.json';

function handleError(err) {
  console.log('Catch error');
  console.error(err);
}

async function fetchJsonData(url) {
  const response = await fetch(url);

  if (response.ok) {
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
  const [objectManifest, setObjectManifest] = useState(manifestBlank);
  const [page, setPage] = useState(1);
  const [manifestPending, setManifestPending] = useState(false);
  const [recordsPending, setRecordsPending] = useState(false);

  async function fetchRecords() {
    if (searchTerm === '') {
      setObjectInfo({});
      setObjectRecords([]);
      return;
    }
    setRecordsPending(true);
    const objectData = await fetchJsonData(
      `https://api.vam.ac.uk/v2/objects/search?q=${searchTerm}&min_length=2&max_length=16&images_exist=false&order_sort=asc&page=${page}&page_size=15&cluster_size=20&images=true&random=false`
    ).catch(handleError);
    if (!objectData) return;
    setObjectInfo(objectData.info);
    setObjectRecords(objectData.records);
    setRecordsPending(false);
  }

  async function fetchManifest(url) {
    if (url === '') {
      setObjectManifest(manifestBlank);
      return;
    }
    setManifestPending(true);
    const manifestData = await fetchJsonData(url).catch(handleError);
    if (!manifestData) return;
    setObjectManifest(manifestData);
    setManifestPending(false);
  }

  async function handleIncrementPage() {
    setPage((currPage) => {
      if (currPage < objectInfo.pages) return currPage + 1;
      return currPage;
    });
  }

  async function handleDecrementPage() {
    setPage((currPage) => {
      if (currPage > 1) return currPage - 1;
      return currPage;
    });
  }

  useEffect(() => {
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
