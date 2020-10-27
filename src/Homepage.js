import React from "react";
import { PlayList } from "./PlayList";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";

export const Homepage = () => {
  const endpoint = "https://api.spotify.com/v1/me";
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${sessionStorage.accessToken}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const [loading, data, error] = useHandleFetchAndLoad(
    endpoint,
    requestOptions
  );

  if (loading) {
    return <div>Loading from {endpoint}</div>;
  }

  const userName = data.display_name;

  // fetch("https://api.spotify.com/v1/me", requestOptions)
  //   .then((response) => response.json())
  //   .then((res) => {
  //     sessionStorage.setItem("name", res.display_name);
  //   })
  //   .catch((error) => console.log("error", error));

  return (
    <div>
      Welcome {userName}!
      <PlayList />
    </div>
  );
};
