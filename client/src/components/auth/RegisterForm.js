import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useGlobalContextAuth } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";
import AlertConfirmMessage from "../layout/AlertConfirmMessage";
import "./auth.css";

function RegisterForm() {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { username, password, confirmPassword } = registerForm;
  const [alert, setAlert] = useState(null);
  const [alertConfirm, setAlertConfirm] = useState(null);
  const { userRegister } = useGlobalContextAuth();
  const history = useHistory();

  const changeValue = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const register = async (event) => {
    event.preventDefault();

    try {
      if (password !== confirmPassword) {
        setAlertConfirm({
          type: false,
          msg: "Please make sure your password match",
        });
        setTimeout(() => {
          setAlertConfirm(null);
        }, 3000);
      } else {
        const registerData = await userRegister(registerForm);
        if (registerData.success) {
          history.push("/login");
        } else {
          setAlert({ type: registerData.success, msg: registerData.msg });
          setTimeout(() => {
            setAlert(null);
          }, 3000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-modal">
      <form className="register-form" onSubmit={register}>
        <h3>Register</h3>
        <div>
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            onChange={changeValue}
            value={username}
            style={{ borderColor: `${!alert ? "" : "#f00"}` }}
            className="username"
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={changeValue}
            value={password}
            style={{ borderColor: `${!alert ? "" : "#f00"}` }}
            className="password"
          />

          <label htmlFor="confirmPassword">
            <b>Confirm Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Confirm Password"
            name="confirmPassword"
            onChange={changeValue}
            value={confirmPassword}
            style={{ borderColor: `${!alertConfirm ? "" : "#f00"}` }}
            className="password"
          />
          <AlertMessage alert={alert} />
          <AlertConfirmMessage alertConfirm={alertConfirm} />
          <button className="btn-register" type="submit">
            Register
          </button>
        </div>
        <p>
          Already have an account?
          <Link className="link-login-account" to="/login">
            {" "}
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
