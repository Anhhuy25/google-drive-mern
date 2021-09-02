import React from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import "./trashposts.css";

function ModalConfirmDelete() {
  const {
    setShowIconNavbarTrashPost,
    setModalConfirmDelete,
    deletePost,
    info,
    deleteFolder,
    isPost,
    isInsideFP,
    deleteInsideFoldersPost,
    deleteInsideFFs,
  } = useGlobalContext();

  const deleteForever = async (id) => {
    try {
      if (isPost) {
        await deletePost(id);
      } else {
        await deleteFolder(id);
      }
      if (isInsideFP) {
        await deleteInsideFoldersPost(id);
      } else {
        await deleteInsideFFs(id);
      }
      setModalConfirmDelete(false);
      setShowIconNavbarTrashPost(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-overlay show-modal">
      <div className="modalconfirmdelete-container">
        <div className="modalconfirmdelete-title">Delete forever?</div>
        <div className="modalconfirmdelete-description">
          "{info.folderName || info.fileName}" will be deleted forever and you
          won't be able to restore it.
        </div>
        <div className="modalconfirmdelete-btn">
          <button
            onClick={() => setModalConfirmDelete(false)}
            className="modalconfirmdelete-btncancel"
          >
            CANCEL
          </button>
          <button
            onClick={() => deleteForever(info._id)}
            className="modalconfirmdelete-btndelete"
          >
            DELETE FOREVER
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmDelete;
