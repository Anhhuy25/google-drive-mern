import React from "react";
import { useHistory } from "react-router-dom";
import { useGlobalContextAuth } from "../../contexts/AuthContext";
import {
  LOCAL_STORAGE_TOKEN_NAME,
  RETURN_LOGIN,
} from "../../contexts/constants";
import "./layout.css";

function Dropdown({ accountRef }) {
  const {
    authState: {
      user: { username },
    },
    dispatch,
  } = useGlobalContextAuth();
  const history = useHistory();

  // Click button use another account
  const addAnotherAccount = () => {
    dispatch({
      type: RETURN_LOGIN,
      payload: { isAuthenticated: false, getUsername: "" },
    });
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
  };

  const signOut = () => {
    history.push("/choose-account");
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
  };

  return (
    <div ref={accountRef} className="dropdown-container">
      <div className="dropdown-username">
        <i className="fa fa-user-circle" aria-hidden="true"></i>
        <p>{username}</p>
      </div>
      <div className="dropdown-add-account" onClick={addAnotherAccount}>
        <i className="fas fa-user-plus"></i>
        <span>Add another account</span>
      </div>
      <div className="dropdown-logout">
        <button onClick={signOut}>Sign out</button>
      </div>
    </div>
  );
}

export default Dropdown;
