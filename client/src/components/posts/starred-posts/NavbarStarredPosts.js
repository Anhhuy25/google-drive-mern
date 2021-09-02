import React from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import IconNavbarStarredPosts from "./IconNavbarStarredPosts";
import ModalUndone from "../navbar-post/ModalUndone";
import DetailPost from "../DetailPost";
import ModalAddStarr from "../navbar-post/ModalAddStarr";
import "./starredposts.css";

function NavbarStarredPosts() {
  const {
    showDetail,
    setShowDetail,
    showIconNavbarStarredPost,
    modalUndone,
    modalAddStarr,
  } = useGlobalContext();

  return (
    <div className="navbarstarredposts-container">
      <div className="navbarstarredposts-title">
        <p>Starred</p>
      </div>

      <div>
        <div className="navbarstarredposts-icon">
          {showIconNavbarStarredPost && (
            <div className="navbarstarredpostsicon-container">
              <IconNavbarStarredPosts />
            </div>
          )}
          <div
            className="navbarstarredposts-detail"
            onClick={() => setShowDetail(!showDetail)}
          >
            <i className="fa fa-info-circle" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      {showDetail && <DetailPost />}
      {modalUndone && <ModalUndone />}
      {modalAddStarr && <ModalAddStarr />}
    </div>
  );
}

export default NavbarStarredPosts;
