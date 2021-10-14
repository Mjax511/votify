import React from "react";
import { LoginButton } from "./LoginButton";
import { NewPlaylist } from "./NewPlaylist";
import { PlayList } from "./PlayList";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";
import { Container, Header } from "semantic-ui-react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

function HandleAuth(props) {
  const endpoint = "https://accounts.spotify.com/api/token";

  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Basic ZDYxZDljMmNjZTAyNDFjMWJlZTI0MGU3OTczMDNiMjM6ZmFlMzFiNWI5NTIwNDQ2Mzk0OTE1NzJkYWJkNDNlN2Q="
  );
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Cookie",
    "__Host-device_id=AQAM2Cs4CAqkO60Mhy0ZjxJkalvjJGJ43zV2Z9tqxYKbJ-Mz2V6LkE3lBe1wcks2KIwCN1ZElxxWq74EmV0Eya99KiVCol8dEWk"
  );

  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append("code", props.authCode);
  urlencoded.append("redirect_uri", "http://localhost:3000");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const [loading, data, error] = useHandleFetchAndLoad(
    endpoint,
    requestOptions
  );

  if (loading) {
    return <div>Loading from {endpoint}</div>;
  }
  if (!data?.access_token || error) {
    return <div>{`error: ${error}!!!`}</div>;
  }
  sessionStorage.setItem("accessToken", data.access_token);
  window.location = "http://localhost:3000";

  // return <Homepage/>
  // return <Redirect to={{pathname: "/"}}/>;

  // fetch("https://accounts.spotify.com/api/token", requestOptions)
  //   .then(response => {
  //     if (response.status !== 200) {
  //       throw new Error(`Error: ${response.status} while requesting token`)
  //     }
  //     return response.json()
  //   })
  //   .then(data => {
  //     sessionStorage.setItem("accessToken", data.access_token)
  //     setLoading(false);
  //     window.location = "http://localhost:3000"
  //   })
  //   .catch(error => console.log('error', error));
  // const tokenData = await response.json();
  // sessionStorage.setItem("token", tokenData.access_token);
}
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
    console.log('here')
  if (data?.error) return <LoginButton />; // checks to see if there is an old access token

  const authCode = window.location.href.split("?")[1]
    ? window.location.href.split("?")[1].split("=")[1]
    : null;
  if (sessionStorage.accessToken && sessionStorage.accessToken !== 'null') {
    return (
    <StyledContainer>
      <Header>Welcome {userName}!</Header>
      <PlayList />
      <NewPlaylist />
    </StyledContainer>
    )
  }
  console.log('jere');

  if (authCode) {
    return <HandleAuth authCode={authCode}></HandleAuth>;
  }
  return <LoginButton></LoginButton>;
  // return (
  //   <StyledContainer>
  //     <Header>Welcome {userName}!</Header>
  //     <PlayList />
  //     <NewPlaylist />
  //   </StyledContainer>
  // );
};
