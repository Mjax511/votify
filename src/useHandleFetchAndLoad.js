import React, { useState, useEffect } from "react";

export function useHandleFetchAndLoad(endpoint, requestOptions) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(0);

  const refresh = () => {
    setCounter(counter => counter + 1)
    setLoading(true);
    setData(null);
  }
  console.log(counter, endpoint)
  useEffect(() => {
    try {
      (async () => {
        const res = await fetch(endpoint, requestOptions);
        setData(await res.json());
        setLoading(false);
      })();
    } catch (err) {
      setError(err);
      setLoading(false);
    }
    // finally {
    //   setLoading(false);
    // }
    //   .then((res) => {
    //     return (res.json());
    //     setLoading(false);
    //   }).then(data => {
    //       setData(data)
    //   })
    //   .catch((err) => {
    //       setError(err)
    //   });
  }, [counter]);
  // if (loading) {
  //   return <div>Loading fetch from {endpoint}</div>;
  // }
  //how to do this?

  return [loading, data, error, refresh];
}
