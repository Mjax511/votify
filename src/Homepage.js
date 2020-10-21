import React from 'react';

export const Homepage = () => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${sessionStorage.accessToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://api.spotify.com/v1/me", requestOptions)
      .then(response => response.json())
      .then(res => {
        sessionStorage.setItem("name", res.display_name)
      })
      .catch(error => console.log('error', error));

    return (
        <div>{sessionStorage.name}</div>
    );
};
