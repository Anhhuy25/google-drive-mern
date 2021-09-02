import React from "react";
import { Redirect } from "react-router-dom";
import { useGlobalContextAuth } from "../../contexts/AuthContext";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import Loading from "./Loading";

function Auth({ authRoute }) {
  const { authState } = useGlobalContextAuth();

  const { authLoading, isAuthenticated } = authState;
  let body;

  if (authLoading) {
    return <Loading />;
  } else if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  } else {
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );
  }
  return <>{body}</>;
}

export default Auth;
