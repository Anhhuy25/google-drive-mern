import React from "react";
import { useParams } from "react-router-dom";
import HomeSearchLogOut from "../layout/HomeSearchLogOut";
import NavbarPostsInside from "../folders/inside/NavbarPostsInside";
import InsideBody from "../folders/inside/InsideBody";
import NavbarInside from "../folders/inside/NavbarInside";
import "../../grid.css";

function InsideFolders() {
  const { id } = useParams();

  return (
    <>
      <HomeSearchLogOut />
      <div style={{ display: "flex" }}>
        <div className="l-2">
          <NavbarInside id={id} />
        </div>
        <div className="l-10">
          <NavbarPostsInside id={id} />
          <InsideBody id={id} />
        </div>
      </div>
    </>
  );
}

export default InsideFolders;
