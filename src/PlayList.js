import React from "react";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";

export const PlayList = () => {
  const endpoint = "https://api.spotify.com/v1/me/playlists";
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${sessionStorage.accessToken}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const listPlay = (list) => {
    if (list !== undefined) {
      return Object.keys(list).map((key) => (
        <li key={key}>{list[key].name}</li>
      ));
    }
  };

  const [loading, data, error] = useHandleFetchAndLoad(endpoint, requestOptions);

  if (loading) {
    return <div>Playlist Loading from {endpoint}</div>;
  }
  //need to figure out how to handle this and error 

  const playlist = data.items;
  return <ul>{listPlay(playlist)}</ul>;

  // fetch("https://api.spotify.com/v1/me/playlists", requestOptions)
  //   .then((response) => response.json())
  //   .then((res) => {
  //     setPlaylist(res.items);
  //     setLoading(false);
  //   })
  //   .catch((error) => console.log("error", error));

  // return <div>Playlist Loading</div>;
};
