import React, { useState, useEffect } from "react";

export function useHandleFetchAndLoad(endpoint, requestOptions) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(async () => {
    try {
      const res = await fetch(endpoint, requestOptions);
      setData(await res.json());
    } catch (err) {
      setError(err);
    } finally {
        setLoading(false);
    }
    //   .then((res) => {
    //     return (res.json());
    //     setLoading(false);
    //   }).then(data => {
    //       setData(data)
    //   })
    //   .catch((err) => {
    //       setError(err)
    //   });
  }, []);

  return [loading, data, error];
}
