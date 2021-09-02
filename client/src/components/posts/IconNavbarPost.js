import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../../contexts/PostsContext";
import MoreActions from "./navbar-post/MoreActions";
import ModalRename from "./navbar-post/ModalRename";

function IconNavbarPost() {
  const {
    modalRename,
    info,
    softDeletePost,
    setShowIconNavbarPost,
    setModalUndo,
    showMoreActions,
    setShowMoreActions,
    softDeleteFolder,
    isPost,
    isInsideFP,
    softDeleteInsideFPs,
    softDeleteInsideFFs,
  } = useGlobalContext();
  const actionsRef = useRef();

  const handleSoftDelete = async (id) => {
    try {
      if (isPost) {
        await softDeletePost(id);
      }
      if (!isPost && info.parent) {
        await softDeleteFolder(id);
      }
      if (isInsideFP && info.children) {
        await softDeleteInsideFPs(id);
      }
      if (!isInsideFP && info.children) {
        await softDeleteInsideFFs(id);
      }
      setShowIconNavbarPost(false);
      setModalUndo(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu, then close the menu
      if (
        showMoreActions &&
        actionsRef.current &&
        !actionsRef.current.contains(e.target)
      ) {
        setShowMoreActions(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showMoreActions]);

  return (
    <>
      <div
        onClick={() => handleSoftDelete(info._id)}
        className="navbarposticon-trash"
      >
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="#000000"
          focusable="false"
          className=" a-s-fa-Ha-pa"
        >
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
          <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
        </svg>
        <p>Remove</p>
      </div>
      <div
        className="navbarposticon-moreactions"
        onClick={() => setShowMoreActions(true)}
      >
        <svg
          className=" a-s-fa-Ha-pa"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          focusable="false"
          fill="#000000"
        >
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
        </svg>
        <p>More actions</p>
        {showMoreActions && <MoreActions actionsRef={actionsRef} />}
      </div>
      <div className="navbarposticon-border"></div>
      {modalRename && <ModalRename />}
    </>
  );
}

export default IconNavbarPost;
