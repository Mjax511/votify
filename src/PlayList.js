import React from "react";

export const PlayList = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${sessionStorage.accessToken}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://api.spotify.com/v1/me/playlists", requestOptions)
        .then(response => response.json())
        .then(res => {
            sessionStorage.setItem("playlists", JSON.stringify(res.items))
        })
        .catch(error => console.log('error', error));

    const listPlay = (list) => {
        //console.log(sessionStorage.playlists.length)
        if (list !== undefined) {
            var parcedList = JSON.parse(list)
            // for (var i = 0; i < parcedList.length; i++) {
                // console.log(parcedList[i].name)
                return Object.keys(parcedList).map(key => <li key={key}>{parcedList[key].name}</li>)
    
            // }
            // console.log(parcedList)
            // console.log(Object.keys(parcedList))
            // console.log(Object.keys(parcedList).map(key => <li>{parcedList[Number(key)]}</li>))
        }

    }

    return <ul>{listPlay(sessionStorage.playlists)}</ul>

}