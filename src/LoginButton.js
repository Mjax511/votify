import React from "react";
import { useAuth } from "./useAuth"

export const LoginButton = () => {
  const auth = useAuth();
  return (
    <div>
    <h2>You are not logged in</h2>
      <button onClick={auth.signin()}>Login</button>
    </div>
  );
};
