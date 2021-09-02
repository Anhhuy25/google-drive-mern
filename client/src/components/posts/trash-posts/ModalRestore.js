import React from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import "./trashposts.css";

function ModalRestore() {
  const {
    setModalRestore,
    info,
    softDeletePost,
    setModalUndone,
    softDeleteFolder,
    isPost,
    isInsideFP,
    softDeleteInsideFPs,
    softDeleteInsideFFs,
  } = useGlobalContext();

  const handleUndoRestore = async () => {
    if (isPost) {
      await softDeletePost(info._id);
    } else {
      await softDeleteFolder(info._id);
    }
    if (isInsideFP) {
      await softDeleteInsideFPs(info._id);
    } else {
      await softDeleteInsideFFs(info._id);
    }
    setModalRestore(false);
    setModalUndone(true);
  };

  return (
    <div className="modalrestore-container">
      <span>Restore {info.folderName || info.fileName}</span>
      <button onClick={handleUndoRestore} className="modalrestore-btnundo">
        UNDO
      </button>
      <button className="modalrestore-btnclose">
        <i
          onClick={() => setModalRestore(false)}
          className="fa fa-times"
          aria-hidden="true"
        ></i>
      </button>
    </div>
  );
}

export default ModalRestore;
