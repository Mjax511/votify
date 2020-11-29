import React from "react";
import { LoginButton } from "./LoginButton";
import { NewPlaylist } from "./NewPlaylist";
import { PlayList } from "./PlayList";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";
import { Container, Header} from "semantic-ui-react";
import styled from "styled-components";

export const Homepage = () => {
  const StyledContainer = styled(Container)`
  &&& {
    width: 500px;
  }`;
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
  if (data?.error) return <LoginButton />; // checks to see if there is an old access token

  return (
    <StyledContainer>
      <Header>Welcome {userName}!</Header>
      <PlayList />
      <NewPlaylist />
    </StyledContainer>
  );
};
