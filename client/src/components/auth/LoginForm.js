import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContextAuth } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";
import "./auth.css";

function LoginForm() {
  const {
    userLogin,
    authState: { getUsername },
  } = useGlobalContextAuth();
  const [loginForm, setLoginForm] = useState({
    username: getUsername ? getUsername : "",
    password: "",
  });
  const { username, password } = loginForm;
  const [alert, setAlert] = useState(null);
  const changeValue = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await userLogin(loginForm);

      if (!loginData.success) {
        setAlert({ type: loginData.success, msg: loginData.msg });
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-modal">
      <form className="login-form" onSubmit={login}>
        <h3>Login</h3>
        <div>
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
            style={{ borderColor: `${!alert ? "" : "#f00"}` }}
            type="text"
            placeholder="Enter Username"
            name="username"
            value={username}
            onChange={changeValue}
            className="username"
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            style={{ borderColor: `${!alert ? "" : "#f00"}` }}
            type="password"
            placeholder="Enter Password"
            name="password"
            value={password}
            onChange={changeValue}
            className="password"
          />
          <AlertMessage alert={alert} />
          <button className="btn-login" type="submit">
            Login
          </button>
        </div>
        <p>
          Don't have an account?
          <Link className="link-create-account" to="/register">
            {" "}
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
