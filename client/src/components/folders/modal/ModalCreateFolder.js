import React from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import "../folders.css";

function ModalCreateFolder({ id }) {
  const {
    valueModalCreate,
    setValueModalCreate,
    setModalCreateFolder,
    createFolder,
    isInsideFP,
    isPost,
    createInsideFFs,
  } = useGlobalContext();

  const handleCreateFolder = async () => {
    if (isPost) {
      await createFolder(valueModalCreate);
    }
    if (isInsideFP) {
      await createInsideFFs(valueModalCreate, id);
    }
    setModalCreateFolder(false);
    setValueModalCreate("Untitled folder");
  };

  const handleCloseCreateFolder = () => {
    setModalCreateFolder(false);
    setValueModalCreate("Untitled folder");
  };

  return (
    <>
      <div className="modalcreatefolder-title">
        <span>New folder</span>
        <i
          onClick={handleCloseCreateFolder}
          className="fa fa-times"
          aria-hidden="true"
        ></i>
      </div>

      <div className="modalcreatefolder-text">
        <input
          type="text"
          value={valueModalCreate}
          onChange={(e) => setValueModalCreate(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="modalcreatefolder-btn">
        <button
          onClick={handleCloseCreateFolder}
          className="modalcreatefolder-btncancel"
        >
          CANCEL
        </button>
        <button
          onClick={handleCreateFolder}
          className="modalcreatefolder-btncreate"
        >
          CREATE
        </button>
      </div>
    </>
  );
}

export default ModalCreateFolder;
