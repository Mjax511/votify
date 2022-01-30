import React from "react";
import { Switch, Redirect, Route, Link } from "react-router-dom";
import { useAuth } from "./useAuth"

export const SignedInRoute = ({children, ...rest}) => {
const auth = useAuth();
  return (
    <Route
    {...rest}
    render={({ location }) =>
      sessionStorage.accessToken ? (
        children
      ) : (
        <Redirect
        to={{
          pathname: "/login",
          state : { from: location}
        }}
        />
      )
    }
    />
  );
}
