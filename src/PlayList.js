import { render } from "@testing-library/react";
import React, { useState } from "react";
import { Container, Header, List } from "semantic-ui-react";
import { LoginButton } from "./LoginButton";
import { PlaylistItem } from "./PlaylistItem";
import { SongList } from "./SongList";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";
import styled from 'styled-components';

export const PlayList = () => {

const StyledContainer = styled(Container)`
  &&& {
    width: 500px;
  }`;
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
    return <SongList playlistId={data.items[itemClicked].id} playlistName={data.items[itemClicked].name}/>
  }
  const playlist = data.items;
  // return <List>{listPlay(playlist)}</List>;
  return (
    <StyledContainer>
      <List selection divided animated>
        {listPlay(playlist)}
      </List>
    </StyledContainer>
  );

  // fetch("https://api.spotify.com/v1/me/playlists", requestOptions)
  //   .then((response) => response.json())
  //   .then((res) => {
  //     setPlaylist(res.items);
  //     setLoading(false);
  //   })
  //   .catch((error) => console.log("error", error));

  // return <div>Playlist Loading</div>;
};
