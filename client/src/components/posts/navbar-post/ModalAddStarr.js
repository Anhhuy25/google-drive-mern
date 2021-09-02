import React from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import "../posts.css";

function ModalAddStarr() {
  const {
    setModalAddStarr,
    setModalUndone,
    info,
    isPost,
    isInsideFP,
    removeStarredInsideFFs,
    removeStarredInsideFPs,
    removeStarredFolders,
    removeStarredPosts,
  } = useGlobalContext();

  const handleUndoAddStarr = async () => {
    if (isPost) {
      await removeStarredPosts(info);
    } else {
      await removeStarredFolders(info);
    }
    if (isInsideFP) {
      await removeStarredInsideFPs(info);
    } else {
      await removeStarredInsideFFs(info);
    }
    setModalAddStarr(false);
    setModalUndone(true);
  };

  return (
    <div className="modaladdstarr-container">
      <span>
        {info.isStarred === 0
          ? `One ${
              (info.folderName && "folder") || (info.fileName && "file")
            } added to Starred`
          : `One ${
              (info.folderName && "folder") || (info.fileName && "file")
            } removed from Starred`}
      </span>
      <button onClick={handleUndoAddStarr} className="modaladdstarr-btnundo">
        UNDO
      </button>
      <button className="modaladdstarr-btnclose">
        <i
          onClick={() => setModalAddStarr(false)}
          className="fa fa-times"
          aria-hidden="true"
        ></i>
      </button>
    </div>
  );
}

export default ModalAddStarr;
