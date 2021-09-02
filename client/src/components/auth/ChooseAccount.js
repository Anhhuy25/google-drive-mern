import React, { useState } from "react";
import { useGlobalContextAuth } from "../../contexts/AuthContext";
import Modal from "./Modal";
import { RETURN_LOGIN } from "../../contexts/constants";
import "./auth.css";

function ChooseAccount() {
  const [isShow, setIsShow] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [infoUser, setInfoUser] = useState({ name: "", id: "" });
  const {
    deleteUser,
    authState: { users },
    dispatch,
  } = useGlobalContextAuth();

  const redirectToLogin = async (name, id) => {
    if (isShow) {
      dispatch({
        type: RETURN_LOGIN,
        payload: { isAuthenticated: false, getUsername: name },
      });
    } else {
      setShowModal(true);
      setInfoUser({ name, id });
    }
  };

  return (
    <>
      <div className="choose-account-modal">
        <div className="choose-account">
          <h3>{!isShow ? "Remove an account" : "Choose an account"}</h3>
          {users &&
            users.map((user) => {
              const { _id, username } = user;
              return (
                <div className="choose-account-user" key={_id}>
                  <button
                    className="choose-account-user-btn"
                    onClick={() => redirectToLogin(username, _id)}
                  >
                    <p>
                      <i className="fa fa-user-circle" aria-hidden="true"></i>
                      <span>{username}</span>
                    </p>
                    <p>
                      {!isShow ? (
                        <svg
                          aria-hidden="true"
                          className="stUf5b"
                          fill="currentColor"
                          focusable="false"
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          xmlns="https://www.w3.org/2000/svg"
                          style={{ color: "#f00" }}
                        >
                          <path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                        </svg>
                      ) : (
                        "Signed out"
                      )}
                    </p>
                  </button>
                </div>
              );
            })}
          <div className="choose-account-adduser">
            <button
              className="choose-account-adduser-btn"
              onClick={() =>
                dispatch({
                  type: RETURN_LOGIN,
                  payload: { isAuthenticated: false, getUsername: "" },
                })
              }
            >
              <i className="fa fa-user-plus" aria-hidden="true"></i>
              <span>Use another account</span>
            </button>
          </div>
          <div className="choose-account-removeuser">
            {isShow ? (
              <button
                onClick={() => setIsShow(false)}
                className="choose-account-removeuser-btn"
              >
                <i className="fas fa-user-minus"></i>
                <span>Remove an account</span>
              </button>
            ) : (
              <button
                className="choose-account-removeuserdone-btn"
                onClick={() => setIsShow(true)}
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          infoUser={infoUser}
          deleteUser={deleteUser}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}

export default ChooseAccount;
