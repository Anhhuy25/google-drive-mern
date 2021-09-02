import React from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import ModalConfirmDelete from "./ModalConfirmDelete";
import "./trashposts.css";

function IconNavbarTrashPost() {
  const {
    modalConfirmDelete,
    setModalConfirmDelete,
    restorePost,
    info,
    setModalRestore,
    restoreFolder,
    isPost,
    isInsideFP,
    restoreInsideFoldersPost,
    restoreInsideFFs,
  } = useGlobalContext();

  const handleRestorePost = async () => {
    if (isPost) {
      await restorePost(info._id);
    }
    if (!isPost && info.parent) {
      await restoreFolder(info._id);
    }
    if (isInsideFP && info.children) {
      await restoreInsideFoldersPost(info._id);
    }
    if (!isInsideFP && info.children) {
      await restoreInsideFFs(info._id);
    }
    setModalRestore(true);
  };

  return (
    <>
      <div onClick={handleRestorePost} className="navbartrashposticon-restore">
        <svg
          className="a-s-fa-Ha-pa"
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="#000000"
        >
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path>
        </svg>
        <p>Restore from trash</p>
      </div>
      <div
        onClick={() => setModalConfirmDelete(true)}
        className="navbartrashposticon-trash"
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
        <p>Delete forever</p>
      </div>
      {modalConfirmDelete && <ModalConfirmDelete />}
    </>
  );
}

export default IconNavbarTrashPost;
