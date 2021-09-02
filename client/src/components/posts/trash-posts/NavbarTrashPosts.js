import React from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import "./trashposts.css";
import DetailPost from "../DetailPost";
import ModalProgressUpload from "../navbar-post/ModalProgressUpload";
import IconNavbarTrashPost from "./IconNavbarTrashPost";
import ModalRestore from "./ModalRestore";
import ModalUndone from "../navbar-post/ModalUndone";

function NavbarTrashPosts() {
  const {
    showDetail,
    setShowDetail,
    showModalUpload,
    showIconNavbarTrashPost,
    modalRestore,
    modalUndone,
  } = useGlobalContext();

  return (
    <div className="navbartrashposts-container">
      <div className="navbartrashposts-title">
        <p>Trash for My Drive</p>
      </div>

      <div>
        <div className="navbartrashposts-icon">
          {showIconNavbarTrashPost && (
            <div className="navbartrashposticon-container">
              <IconNavbarTrashPost />
            </div>
          )}
          <div
            className="navbartrashposts-detail"
            onClick={() => setShowDetail(!showDetail)}
          >
            <i className="fa fa-info-circle" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      {showDetail && <DetailPost />}
      {showModalUpload && <ModalProgressUpload />}
      {modalRestore && <ModalRestore />}
      {modalUndone && <ModalUndone />}
    </div>
  );
}

export default NavbarTrashPosts;
