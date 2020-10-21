import { Button } from '@material-ui/core';
import React from 'react';

export const LoginButton = () => {
   
    const redirect_uri = 'http://localhost:3000'
    const my_client_id = 'd61d9c2cce0241c1bee240e797303b23'
    const scopes = ''
    //const authHeader = 'Basic ZDYxZDljMmNjZTAyNDFjMWJlZTI0MGU3OTczMDNiMjM6ZmFlMzFiNWI5NTIwNDQ2Mzk0OTE1NzJkYWJkNDNlN2Q='
    const spotifyAuthURI = `https://accounts.spotify.com/authorize?response_type=code&client_id=${my_client_id}${scopes ? '&scope=' + encodeURIComponent(scopes) : ''}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
    const onClick = () => {
        window.location = spotifyAuthURI
    }

    return (
        <Button variant='contained' color='primary' onClick={onClick}>Login</Button>
    )

}