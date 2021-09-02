import React, { useEffect } from "react";
import { OPEN_MODAL_UPLOAD_INSIDE } from "../../../contexts/constants";
import { useGlobalContext } from "../../../contexts/PostsContext";

function UploadTableInside({ id, modalInsideRef }) {
  const {
    selectedFile,
    setSelectedFile,
    onFileUploadInsideFolders,
    setShowModalUploadInside,
    setShowModalInside,
    dispatch,
    setModalCreateFolder,
    setIsInsideFP,
  } = useGlobalContext();

  const fileChange = (e) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      dispatch({
        type: OPEN_MODAL_UPLOAD_INSIDE,
        payload: { insideFolders_UploadPosts: e.target.files[0] },
      });
    }
  };

  const openModalCreateFolder = () => {
    setModalCreateFolder(true);
    setShowModalInside(false);
    setIsInsideFP(true);
  };

  useEffect(() => {
    if (selectedFile) {
      onFileUploadInsideFolders(id);
      setShowModalInside(false);
      setShowModalUploadInside(true);
    }
  }, [
    selectedFile,
    onFileUploadInsideFolders,
    setShowModalInside,
    setShowModalUploadInside,
  ]);

  return (
    <div ref={modalInsideRef} className="navbar-uploadtable">
      <div
        className="navbar-uploadtable-createfolder"
        onClick={openModalCreateFolder}
      >
        <i className="fas fa-folder-plus"></i>
        <span>Folder</span>
      </div>
      {/* Phần upload file sử dụng multer bên backend */}
      <div className="navbar-uploadtable-uploadfile">
        <label htmlFor="file-uploadinside">
          <i className="fa fa-upload" aria-hidden="true"></i>
          <span>File upload</span>
        </label>
        <input
          type="file"
          name="myFileInside"
          id="file-uploadinside"
          onChange={fileChange}
        />
      </div>

      <div className="navbar-uploadtable-uploadfolder">
        <label htmlFor="folder-upload">
          <i className="fa fa-upload" aria-hidden="true"></i>
          <span>Folder upload</span>
        </label>
        <input type="file" name="myFolderInside" id="folder-upload" />
      </div>
    </div>
  );
}

export default UploadTableInside;
