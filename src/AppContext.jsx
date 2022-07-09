/* eslint no-underscore-dangle: 0 */

import { createContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

function handleError(err) {
  throw new Error(err);
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
  const [page, setPage] = useState(1);

  async function fetchInfo() {
    if (searchTerm === '') {
      setObjectInfo({});
      setObjectRecords([]);
      return;
    }
    const objectData = await fetchJsonData(
      `https://api.vam.ac.uk/v2/objects/search?q=${searchTerm}`
    ).catch(handleError);
    if (!objectData) return;
    setObjectInfo(objectData.info);
  }

  async function fetchRecords() {
    if (searchTerm === '') {
      setObjectInfo({});
      setObjectRecords([]);
      return;
    }
    const objectData = await fetchJsonData(
      `https://api.vam.ac.uk/v2/objects/search?q=${searchTerm}&min_length=2&max_length=16&images_exist=false&order_sort=asc&page=${page}&page_size=15&cluster_size=20&images=false&random=false`
    ).catch(handleError);
    if (!objectData) return;
    setObjectInfo(objectData.info);
    setObjectRecords(objectData.records);
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

  // Reset to page 1 if searchTerm is changed when navigating pages and current page > pages
  useEffect(() => {
    if (page > objectInfo.pages) setPage(1);
  }, [objectInfo]);

  const context = useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
      fetchInfo,
      fetchRecords,
      page,
      setPage,
      objectInfo,
      objectRecords,
      setObjectInfo,
      setObjectRecords,
      handleIncrementPage,
      handleDecrementPage,
    }),
    [searchTerm, objectInfo, objectRecords, page]
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
