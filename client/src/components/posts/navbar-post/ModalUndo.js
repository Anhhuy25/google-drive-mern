import React from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import "../posts.css";

function ModalUndo() {
  const {
    setModalUndo,
    info,
    restorePost,
    setModalUndone,
    restoreFolder,
    isInsideFP,
    restoreInsideFoldersPost,
    isPost,
    restoreInsideFFs,
  } = useGlobalContext();

  const handleRestorePost = async () => {
    if (isPost) {
      await restorePost(info._id);
    } else {
      await restoreFolder(info._id);
    }
    if (isInsideFP) {
      await restoreInsideFoldersPost(info._id);
    } else {
      await restoreInsideFFs(info._id);
    }
    setModalUndo(false);
    setModalUndone(true);
  };

  return (
    <div className="modalundo-container">
      <span>
        {(info.folderName && "Folder") || (info.fileName && "File")} moved to
        trash
      </span>
      <button onClick={handleRestorePost} className="modalundo-btnundo">
        UNDO
      </button>
      <button className="modalundo-btnclose">
        <i
          onClick={() => setModalUndo(false)}
          className="fa fa-times"
          aria-hidden="true"
        ></i>
      </button>
    </div>
  );
}

export default ModalUndo;
