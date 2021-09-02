import React, { useState } from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import "./navbarpost.css";

function ModalRename() {
  const {
    info,
    setModalRename,
    updatePost,
    setShowMoreActions,
    updateInsideFoldersPosts,
    isPost,
    isInsideFP,
    updateFolder,
    updateInsideFFs,
  } = useGlobalContext();
  const [name, setName] = useState(info.fileName || info.folderName);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmitUpdate = async (event) => {
    event.preventDefault();
    try {
      if (isPost) {
        await updatePost(info, name);
      } else {
        await updateFolder(info, name);
      }
      if (isInsideFP) {
        await updateInsideFoldersPosts(info, name);
      } else {
        await updateInsideFFs(info, name);
      }
      setModalRename(false);
      setShowMoreActions(false);
      setName("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmitUpdate}
      className="modal-overlay show-modal"
    >
      <div className="modalrename-container">
        <div className="modalrename-title">
          <span>Rename</span>
          <span onClick={() => setModalRename(false)}>
            <i className="fa fa-times"></i>
          </span>
        </div>
        <div className="modalrename-input">
          <input
            type="text"
            name="updateFile"
            value={name}
            onChange={handleChangeName}
          />
        </div>
        <div className="modalrename-btn">
          <button
            onClick={() => setModalRename(false)}
            className="modalrename-btncancel"
          >
            CANCEL
          </button>
          <button className="modalrename-btnok">OK</button>
        </div>
      </div>
    </form>
  );
}

export default ModalRename;
