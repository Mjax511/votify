import React, { useState } from "react";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";
import { List } from "semantic-ui-react";

export const SongList = (props) => {
  const [songList, setSongList] = useState({ index: 0, tracks: [] });
  const endpoint = `https://api.spotify.com/v1/playlists/${props.playlistId}/tracks?offset=${songList.index}`;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${sessionStorage.accessToken}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const listPlay = (list) => {
    return list.map((song, i) => (
      <List.Item
        key={i}
        //   onClick={() => {
        //     onClick(key);
        //   }}
      >
        {song}
      </List.Item>
    ));
  };
  const [loading, data, error] = useHandleFetchAndLoad(
    endpoint,
    requestOptions
  );
  if (loading) {
    return <div>Playlist Loading from {endpoint}</div>;
  }

  const songListCopy = JSON.parse(JSON.stringify(songList));
  for (let key in Object.keys(data.items)) {
    songListCopy.tracks.push(data.items[key].track.name);
  }
  if (Object.keys(data.items).length > 99) {
    songListCopy.index += 98;

    // setSongList(songListCopy);
  } 

  return <List>{listPlay(songListCopy.tracks)}</List>;
};
