import React from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import "./navbarpost.css";

function ModalSepaOrUpda({ id }) {
  const {
    uploadRes,
    setModalSepaOrUpda,
    setShowModalUpload,
    keepSeparateFile,
    keepSeparateFileInsideFolders,
    isInsideFP,
    isPost,
  } = useGlobalContext();

  const handleCancel = () => {
    setModalSepaOrUpda(false);
    setShowModalUpload(false);
  };

  const handleKeepSeparate = async () => {
    if (isPost) {
      await keepSeparateFile();
    }
    if (isInsideFP) {
      await keepSeparateFileInsideFolders(id);
    }
    setModalSepaOrUpda(false);
  };

  return (
    <>
      {uploadRes && (
        <>
          <p className="modalsepaorupda-info">
            <b>"{uploadRes.name}"</b> matches an existing item in this folder
            Update the existing item with your upload?
          </p>
          <div className="modalsepaorupda-btn">
            <button
              onClick={handleCancel}
              className="modalsepaorupda-btncancel"
            >
              CANCEL
            </button>
            <button
              onClick={handleKeepSeparate}
              className="modalsepaorupda-btnkeep"
            >
              KEEP SEPARATE
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default ModalSepaOrUpda;
