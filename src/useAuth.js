import React, { useState, useEffect, useContext, createContext } from "react";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = () => {
    sessionStorage.setItem("accessToken", null);
    console.log('sign in has run')
    const redirect_uri = "http://localhost:3000/auth-check";
    const my_client_id = "d61d9c2cce0241c1bee240e797303b23";
    const scopes = "playlist-read-collaborative playlist-modify-public";
    //const authHeader = 'Basic ZDYxZDljMmNjZTAyNDFjMWJlZTI0MGU3OTczMDNiMjM6ZmFlMzFiNWI5NTIwNDQ2Mzk0OTE1NzJkYWJkNDNlN2Q='
    const spotifyAuthURI = `https://accounts.spotify.com/authorize?response_type=code&client_id=${my_client_id}${
      scopes ? "&scope=" + encodeURIComponent(scopes) : ""
    }&redirect_uri=${encodeURIComponent(redirect_uri)}`;
    return () => {
      window.location = spotifyAuthURI;
    };
  };
  // Return the user object and auth methods
  return {
    user,
    signin,
    setUser
  };
}
