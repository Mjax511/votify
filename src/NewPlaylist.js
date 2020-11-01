import React, { useState } from "react";
import { Input } from "semantic-ui-react";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";

export const NewPlaylist = () => {
  const [input, setInput] = useState("");
  const endpoint = "https://api.spotify.com/v1/users/mjaxs/playlists";
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${sessionStorage.accessToken}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = {
    name: { input },
    description: "Votify Playlist",
    public: true,
  };

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      fetch("https://api.spotify.com/v1/users/mjaxs/playlists", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    }
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <Input
      placeholder="New Playlist..."
      onKeyDown={handleEnter}
      onChange={handleChange}
    />
  );
};
