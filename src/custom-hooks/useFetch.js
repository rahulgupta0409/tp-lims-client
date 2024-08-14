import { useState, useEffect } from "react";

const defaults = {
  loading: false,
  error: undefined,
  data: undefined,
};
const defaultRequest = {
  method: undefined,
  body: JSON.stringify({
    undefined,
  }),
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * @param {string} url
 */
const useFetch = (url, method, params) => {
  const [loading, setLoading] = useState(defaults.loading);
  const [error, setError] = useState(defaults.error);
  const [data, setData] = useState(defaults.data);

  const setToLoading = () => {
    setLoading(true);
    setData(undefined);
    setError(undefined);
  };

  const setToData = (data) => {
    setLoading(false);
    setData(data);
    setError(undefined);
  };

  const setToError = (errorMessage) => {
    setLoading(false);
    setData(undefined);
    setError(errorMessage);
  };

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        setToLoading();

        const response = await fetch(url, {
          method: method,
          body: JSON.stringify({
            params,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        const data = await response.json();

        setToData(data);
      } catch (e) {
        setToError(e);
      }
    };
    fetchUrl();
  }, [url]);

  return { loading, error, data };
};

export default useFetch;
