import React from "react";

export const LoginButton = () => {
  sessionStorage.setItem("accessToken", null); //want a fresh access token if logging in, sessionStorage only holds strings
  const redirect_uri = "http://localhost:3000";
  const my_client_id = "d61d9c2cce0241c1bee240e797303b23";
  const scopes = "playlist-read-collaborative playlist-modify-public";
  //const authHeader = 'Basic ZDYxZDljMmNjZTAyNDFjMWJlZTI0MGU3OTczMDNiMjM6ZmFlMzFiNWI5NTIwNDQ2Mzk0OTE1NzJkYWJkNDNlN2Q='
  const spotifyAuthURI = `https://accounts.spotify.com/authorize?response_type=code&client_id=${my_client_id}${
    scopes ? "&scope=" + encodeURIComponent(scopes) : ""
  }&redirect_uri=${encodeURIComponent(redirect_uri)}`;
  const onClick = () => {
    window.location = spotifyAuthURI;
  };

  return <button onClick={onClick}>Login</button>;
};
