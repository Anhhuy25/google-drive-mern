import React from "react";
import "./starredposts.css";

function EmptyStarr() {
  return (
    <div className="emptystarr-container">
      <div>
        <img
          src="https://ssl.gstatic.com/docs/doclist/images/empty_state_starred_files_v2.svg"
          alt="starr"
          className="emptystarr-img"
        />
      </div>
      <div className="emptystarr-text">
        <p>No starred files or folders</p>
        <p>Add stars to things that you want to easily find later</p>
      </div>
    </div>
  );
}

export default EmptyStarr;
