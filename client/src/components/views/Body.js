import React from "react";
import Navbar from "../layout/Navbar";
import Posts from "../posts/Posts";
import NavbarPosts from "../posts/NavbarPosts";
import "../../grid.css";

function Body() {
  return (
    <div style={{ display: "flex" }}>
      <div className="l-2">
        <Navbar />
      </div>
      <div className="l-10">
        <NavbarPosts />
        <Posts />
      </div>
    </div>
  );
}

export default Body;
