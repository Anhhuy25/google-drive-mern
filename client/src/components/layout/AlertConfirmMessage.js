import React from "react";
import "../../App.css";

function AlertConfirmMessage({ alertConfirm }) {
  return alertConfirm === null ? null : (
    <div className={`${alertConfirm.type ? "" : "alert-confirm-msg"}`}>
      {alertConfirm.msg}
    </div>
  );
}

export default AlertConfirmMessage;
