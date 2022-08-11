import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function useAxios(url, method, payload, initialData, willRun, dependency) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    (async () => {
      if (!willRun) {
        setLoaded(true);
        return;
      }
      setLoaded(false);
      const response = await axios
        .request({
          data: payload,
          signal: controllerRef.current.signal,
          method,
          url,
        })
        .catch((err) => setError(err.message));
      if (!response) {
        setLoaded(true);
        return;
      }
      setData(response.data);
      setLoaded(true);
    })();

    // return () => cancel();
  }, [dependency]);

  return { cancel, data, error, loaded };
}

export default useAxios;
