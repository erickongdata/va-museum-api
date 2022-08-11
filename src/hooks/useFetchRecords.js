import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function useFetchRecords(url, willRun, dependency) {
  const [objectInfo, setObjectInfo] = useState({});
  const [objectRecords, setObjectRecords] = useState([]);
  const [isRecordsLoaded, setIsRecordsLoaded] = useState(true);
  const [searchError, setSearchError] = useState('');
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  async function fetchRecords() {
    if (!willRun) {
      return;
    }
    setIsRecordsLoaded(false);

    const response = await axios
      .request({
        signal: controllerRef.current.signal,
        method: 'GET',
        url,
      })
      .catch((err) => setSearchError(err.message));

    if (!response) {
      setIsRecordsLoaded(true);
      return;
    }
    const objectData = response.data;
    setObjectInfo(objectData.info);
    setObjectRecords(objectData.records);
    setIsRecordsLoaded(true);
  }

  useEffect(() => {
    fetchRecords();

    // return () => cancel();
  }, [dependency]);

  return { objectInfo, objectRecords, isRecordsLoaded, searchError, cancel };
}

export default useFetchRecords;
