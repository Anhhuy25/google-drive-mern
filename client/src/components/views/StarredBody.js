import React from "react";
import Navbar from "../layout/Navbar";
import StarredPosts from "../posts/starred-posts/StarredPosts";
import NavbarStarredPosts from "../posts/starred-posts/NavbarStarredPosts";

function StarredBody() {
  return (
    <div style={{ display: "flex" }}>
      <div className="l-2">
        <Navbar />
      </div>
      <div className="l-10">
        <NavbarStarredPosts />
        <StarredPosts />
      </div>
    </div>
  );
}

export default StarredBody;
