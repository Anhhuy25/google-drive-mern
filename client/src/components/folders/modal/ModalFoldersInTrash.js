import React from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import "../../../grid.css";
import "../folders.css";

function ModalFoldersInTrash() {
  const { setIsInTrash, restoreFolder, info } = useGlobalContext();

  const handleRestoreFolder = () => {
    restoreFolder(info._id);
    setIsInTrash(false);
  };

  return (
    <div className="modal-overlay show-modal">
      <div className="modalfolderintrash-container">
        <div className="modalfolderintrash-title">
          <span>This folder is in your trash</span>
          <i
            onClick={() => setIsInTrash(true)}
            className="fa fa-times"
            aria-hidden="true"
          ></i>
        </div>
        <p className="modalfolderintrash-detail">
          To view this folder, you'll need to restore it from your trash.
        </p>
        <div className="modalfolderintrash-btn">
          <button
            onClick={() => setIsInTrash(true)}
            className="modalfolderintrash-btncancel"
          >
            CANCEL
          </button>
          <button
            onClick={handleRestoreFolder}
            className="modalfolderintrash-btnrestore"
          >
            RESTORE
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalFoldersInTrash;
