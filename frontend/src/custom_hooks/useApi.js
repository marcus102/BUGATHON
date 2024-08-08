import { useState, useEffect } from 'react';
import axios from 'axios';

const PORT = 'http://172.20.10.2:8000/';

const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios({
          url: `${PORT}${endpoint}`,
          ...options,
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, options]);

  return { data, error, loading };
};

export default useApi;
