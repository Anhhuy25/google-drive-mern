import React from "react";
import Navbar from "../layout/Navbar";
import NavbarTrashPosts from "../posts/trash-posts/NavbarTrashPosts";
import TrashPosts from "../posts/trash-posts/TrashPosts";

function TrashBody() {
  return (
    <div style={{ display: "flex" }}>
      <div className="l-2">
        <Navbar />
      </div>
      <div className="l-10">
        <NavbarTrashPosts />
        <TrashPosts />
      </div>
    </div>
  );
}

export default TrashBody;
