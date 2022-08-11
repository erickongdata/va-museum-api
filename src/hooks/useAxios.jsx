import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function useAxios(url, method, payload, initialData, willRun) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    if (!willRun) {
      setLoaded(true);
      return;
    }

    (async () => {
      try {
        const response = await axios.request({
          data: payload,
          signal: controllerRef.current.signal,
          method,
          url,
        });
        setError('');
        setData(response.data);
      } catch (err) {
        console.log('Error');
        setError(err.message);
      } finally {
        setLoaded(true);
      }
    })();

    // return () => cancel();
  }, []);

  return { cancel, data, error, loaded };
}

export default useAxios;
