import React from "react";
import "./auth.css";

const Modal = React.memo(({ infoUser, deleteUser, setShowModal }) => {
  const { name, id } = infoUser;
  return (
    <div className="modal-overlay show-modal">
      <div className="modal">
        <h3>Remove an account?</h3>
        <p>
          {name} will no longer be used on this browser. Sign in when you’re
          ready to use your account again.
        </p>
        <div className="modal-btn">
          <button onClick={() => setShowModal(false)}>Cancel</button>
          <button
            onClick={() => {
              deleteUser(id);
              setShowModal(false);
            }}
          >
            Yes, remove
          </button>
        </div>
      </div>
    </div>
  );
});

export default Modal;
