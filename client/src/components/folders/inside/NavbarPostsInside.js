import React, { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import UploadTableInside from "./UploadTableInside";
import ModalUndone from "../../posts/navbar-post/ModalUndone";
import ModalUndo from "../../posts/navbar-post/ModalUndo";
import ModalAddStarr from "../../posts/navbar-post/ModalAddStarr";
import ModalProgressUploadInside from "../modal/ModalProgressUploadInside";
import IconNavbarPost from "../../posts/IconNavbarPost";
import DetailPost from "../../posts/DetailPost";
import "./inside.css";

function NavbarPostsInside({ id }) {
  const [showModalInside, setShowModalInside] = useState(false);
  const {
    showDetail,
    setShowDetail,
    showIconNavbarPost,
    showModalUploadInside,
    modalUndo,
    modalUndone,
    modalAddStarr,
  } = useGlobalContext();
  const modalInsideRef = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu, then close the menu
      if (
        showModalInside &&
        modalInsideRef.current &&
        !modalInsideRef.current.contains(e.target)
      ) {
        setShowModalInside(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showModalInside]);

  return (
    <div className="navbarpostsinside-container">
      <div
        className="navbarpostsinside-uploadtable"
        onClick={() => setShowModalInside(!showModalInside)}
      >
        <span>My drive</span>
        <i className="fas fa-caret-down"></i>
      </div>
      {showModalInside && (
        <UploadTableInside
          id={id}
          modalInsideRef={modalInsideRef}
          setShowModalInside={setShowModalInside}
        />
      )}

      <div>
        <div className="navbarpostsinside-icon">
          {showIconNavbarPost && (
            <div className="navbarposticon-container">
              <IconNavbarPost />
            </div>
          )}
          <div
            className="navbarpostsinside-detail"
            onClick={() => setShowDetail(!showDetail)}
          >
            <i className="fa fa-info-circle" aria-hidden="true"></i>
          </div>
        </div>
      </div>

      {showDetail && <DetailPost />}
      {showModalUploadInside && <ModalProgressUploadInside />}
      {modalUndo && <ModalUndo />}
      {modalUndone && <ModalUndone />}
      {modalAddStarr && <ModalAddStarr />}
    </div>
  );
}

export default NavbarPostsInside;
