import React from "react";
//import logo from './logo.svg';
import "./App.css";
import { LoginButton } from "./LoginButton";
import { Homepage } from "./Homepage";
import { useHandleFetchAndLoad } from "./useHandleFetchAndLoad";
import "semantic-ui-css/semantic.min.css";
import { Switch, Route, Link } from "react-router-dom";
import { AuthCheck } from "./AuthCheck";
import { useAuth } from "./useAuth";
import { SignedInRoute } from "./SignedInRoute";

function App() {
  const auth = useAuth();

  return (
    <Switch>
      <Route path="/login" render={() => <LoginButton />} />
      <Route path="/auth-check" render={() => <AuthCheck />} />
      <SignedInRoute path="/home" component={Homepage} />
      <Route>
        <div>test inside App Switch</div>
      </Route>
    </Switch>
  );
}

export default App;
