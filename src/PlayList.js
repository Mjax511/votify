import React from "react";

export const PlayList = () => {
  const [loading, setLoading] = React.useState(false);
  const [playlist, setPlaylist] = React.useState(null);

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

  if (playlist) {
    return <ul>{listPlay(playlist)}</ul>;
  }
  if (loading) {
    return <div>Playlist Loading</div>;
  }

  setLoading(true);
  fetch("https://api.spotify.com/v1/me/playlists", requestOptions)
    .then((response) => response.json())
    .then((res) => {
      setPlaylist(res.items);
      setLoading(false);
    })
    .catch((error) => console.log("error", error));

  return <div>Playlist Loading</div>;
};
