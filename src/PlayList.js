import { render } from "@testing-library/react";
import React, { useState } from "react";
import { List } from "semantic-ui-react";
import { LoginButton } from "./LoginButton";
import { PlaylistItem } from "./PlaylistItem";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";

export const PlayList = () => {
  const [itemClicked, setItemClicked] = useState(null);
  const endpoint = "https://api.spotify.com/v1/me/playlists";
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

  const onClick = (key) => {
    setItemClicked(key);
  };

  const listPlay = (list) => {
    if (list !== undefined) {
      return Object.keys(list).map((key) => (
        <List.Item
          key={key}
          onClick={() => {
            onClick(key);
          }}
        >
          {list[key].name}
        </List.Item>
      ));
    }
  };

  if (loading) {
    return <div>Playlist Loading from {endpoint}</div>;
  }
  //need to figure out how to handle this and error in one function

  if (itemClicked) {
    return <div>{itemClicked}</div>;
  }
  const playlist = data.items;
  return <List>{listPlay(playlist)}</List>;

  // fetch("https://api.spotify.com/v1/me/playlists", requestOptions)
  //   .then((response) => response.json())
  //   .then((res) => {
  //     setPlaylist(res.items);
  //     setLoading(false);
  //   })
  //   .catch((error) => console.log("error", error));

  // return <div>Playlist Loading</div>;
};
