import React, { useEffect } from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import { useDropzone } from "react-dropzone";
import { INSIDEFOLDERS_UPLOAD } from "../../../contexts/constants";
import UploadPostsInside from "./UploadPostsInside";
import "./inside.css";

function DADInsideFolders() {
  const {
    postsState: { insideFolders_Posts },
    dispatch,
    insideDADFile,
    setInsideDADFile,
    onFileDDInsideFolders,
    setShowModalUploadInside,
  } = useGlobalContext();
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    noClick: true,
  });

  const handleUploadPost = (file) => {
    dispatch({
      type: INSIDEFOLDERS_UPLOAD,
      payload: { insideFolders_UploadPosts: file },
    });
  };

  useEffect(() => {
    if (acceptedFiles) {
      setInsideDADFile(acceptedFiles[0]);
    }
  }, [acceptedFiles, setInsideDADFile]);

  useEffect(() => {
    if (insideDADFile) {
      onFileDDInsideFolders();
      setShowModalUploadInside(true);
      handleUploadPost(acceptedFiles[0]);
    }
    // eslint-disable-next-line
  }, [insideDADFile, onFileDDInsideFolders, setShowModalUploadInside]);

  return (
    <>
      {insideFolders_Posts.length === 0 ? (
        <div className="dadinsidefolders-body">
          <div className="dadinsidefolders-container" {...getRootProps()}>
            <div className="dadinsidefolders-detail">
              <img
                className="dadinsidefolders-img"
                src="https://i.stack.imgur.com/c6hIh.png"
                alt=""
              />
              {/* <div className="dadinsidefolders-img"></div> */}
              <div className="dadinsidefolders-description">
                <input {...getInputProps()} />
                <p>Drop files here</p>
                <p>or use the “New” button.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <UploadPostsInside />
      )}
    </>
  );
}

export default DADInsideFolders;
