import React from "react";
import "../../App.css";

function AlertMessage({ alert }) {
  return alert === null ? null : <div className={`${alert.type ? "" : "alert-msg"}`}>{alert.msg}</div>;
}

export default AlertMessage;
