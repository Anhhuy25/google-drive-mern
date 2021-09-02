import React, { useEffect } from "react";
import { OPEN_MODAL_UPLOAD } from "../../contexts/constants";
import { useGlobalContext } from "../../contexts/PostsContext";

function UploadTable({ modalRef }) {
  const {
    selectedFile,
    setSelectedFile,
    onFileUpload,
    setShowModalUpload,
    dispatch,
    setShowModal,
    setModalCreateFolder,
    setIsPost,
  } = useGlobalContext();

  const fileChange = (e) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      dispatch({
        type: OPEN_MODAL_UPLOAD,
        payload: { uploadPosts: e.target.files[0] },
      });
    }
  };

  const openModalCreateFolder = () => {
    setModalCreateFolder(true);
    setShowModal(false);
    setIsPost(true);
  };

  useEffect(() => {
    if (selectedFile) {
      onFileUpload();
      setShowModal(false);
      setShowModalUpload(true);
    }
  }, [selectedFile, onFileUpload, setShowModal, setShowModalUpload]);

  return (
    <div ref={modalRef} className="navbar-uploadtable">
      <div
        className="navbar-uploadtable-createfolder"
        onClick={openModalCreateFolder}
      >
        <i className="fas fa-folder-plus"></i>
        <span>Folder</span>
      </div>
      {/* Phần upload file sử dụng multer bên backend */}
      <div className="navbar-uploadtable-uploadfile">
        <label htmlFor="file-upload">
          <i className="fa fa-upload" aria-hidden="true"></i>
          <span>File upload</span>
        </label>
        <input
          type="file"
          name="myFile"
          id="file-upload"
          onChange={fileChange}
        />
      </div>

      <div className="navbar-uploadtable-uploadfolder">
        <label htmlFor="folder-upload">
          <i className="fa fa-upload" aria-hidden="true"></i>
          <span>Folder upload</span>
        </label>
        <input type="file" name="myFolder" id="folder-upload" />
      </div>
    </div>
  );
}

export default UploadTable;
