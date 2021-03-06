import React, { useState } from "react";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";
import { Container, List, Header } from "semantic-ui-react";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  &&& {
    width: 500px;
  }`;

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
      <List.Item key={i}>{song.track.name}</List.Item>
    ));
  };
  let [loading, data, error, refresh] = useHandleFetchAndLoad(
    endpoint,
    requestOptions
  );
  if (loading) {
    return <div>Playlist Loading from {endpoint}</div>;
  }

  const playlistLength = data.total;

  console.log(data.items, data.next);
  if (songList.tracks.length < data.total) {
    setSongList((s) => ({
      tracks: [...s.tracks, ...data.items],
      index: s.index + 100,
    }));
    if (data.next) refresh();
  }
  return (
    <StyledContainer>
      <Header>{props.playlistName}</Header>
      <List selection divided animated>
        {listPlay(songList.tracks)}
      </List>
    </StyledContainer>
  );
};
