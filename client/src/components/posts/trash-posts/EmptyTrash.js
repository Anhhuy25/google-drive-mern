import React from "react";
import "./trashposts.css";

function EmptyTrash() {
  return (
    <div className="emptytrash-container">
      <div>
        <img
          src="https://ssl.gstatic.com/docs/doclist/images/empty_state_trash_v2.svg"
          alt="trash"
          className="emptytrash-img"
        />
      </div>
      <div className="emptytrash-text">
        <p>No items</p>
        <p>Items moved to the trash will appear here</p>
      </div>
    </div>
  );
}

export default EmptyTrash;
