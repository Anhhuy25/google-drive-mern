import React, { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../../contexts/PostsContext";
import UploadTable from "./UploadTable";
import DetailPost from "./DetailPost";
import ModalProgressUpload from "./navbar-post/ModalProgressUpload";
import IconNavbarPost from "./IconNavbarPost";
import ModalUndo from "./navbar-post/ModalUndo";
import ModalUndone from "./navbar-post/ModalUndone";
import ModalAddStarr from "./navbar-post/ModalAddStarr";
import "./posts.css";

function NavbarPosts() {
  const [showModal, setShowModal] = useState(false);
  const {
    showDetail,
    setShowDetail,
    showModalUpload,
    showIconNavbarPost,
    modalUndo,
    modalUndone,
    modalAddStarr,
  } = useGlobalContext();
  const modalRef = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu, then close the menu
      if (
        showModal &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showModal]);

  return (
    <div className="navbarposts-container">
      <div
        className="navbarposts-uploadtable"
        onClick={() => setShowModal(!showModal)}
      >
        <span>My Drive</span>
        <i className="fas fa-caret-down"></i>
      </div>
      {showModal && (
        <UploadTable modalRef={modalRef} setShowModal={setShowModal} />
      )}

      <div>
        <div className="navbarposts-icon">
          {showIconNavbarPost && (
            <div className="navbarposticon-container">
              <IconNavbarPost />
            </div>
          )}
          <div
            className="navbarposts-detail"
            onClick={() => setShowDetail(!showDetail)}
          >
            <i className="fa fa-info-circle" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      {showDetail && <DetailPost />}
      {showModalUpload && <ModalProgressUpload />}
      {modalUndo && <ModalUndo />}
      {modalUndone && <ModalUndone />}
      {modalAddStarr && <ModalAddStarr />}
    </div>
  );
}

export default NavbarPosts;
