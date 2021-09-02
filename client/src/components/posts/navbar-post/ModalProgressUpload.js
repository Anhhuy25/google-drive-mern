import React, { useEffect, useState, useMemo } from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import { CircularProgressbar } from "react-circular-progressbar";
import {
  IMAGE_TYPE,
  PDF_TYPE,
  TEXT_TYPE,
  DOCX_TYPE,
  PPTX_TYPE,
  XLSX_TYPE,
  CLOSE_MODAL_UPLOAD,
} from "../../../contexts/constants";
import "react-circular-progressbar/dist/styles.css";
import "../posts.css";

function ModalProgressUpload() {
  const {
    setShowModalUpload,
    progressUpload,
    postsState: { uploadPosts },
    dispatch,
  } = useGlobalContext();
  const [amountFile, setAmountFile] = useState(0);

  useEffect(() => {
    if (uploadPosts.length > 0) {
      setAmountFile(uploadPosts.length);
    }
  }, [uploadPosts]);

  const handleClickModalUpload = () => {
    setShowModalUpload(false);
    setAmountFile(0);
    dispatch({ type: CLOSE_MODAL_UPLOAD, payload: { uploadPosts: [] } });
  };

  const reverseArray = (arr) => {
    var newArray = [];
    for (var i = arr.length - 1; i >= 0; i--) {
      newArray.push(arr[i]);
    }
    return newArray;
  };
  const newUploadPosts = useMemo(
    () => reverseArray(uploadPosts),
    [uploadPosts]
  );

  return (
    <div className="modalprogressupload-container">
      <div className="modalprogressupload-header">
        <p>
          {amountFile} {amountFile <= 1 ? "upload" : "uploads"} complete
        </p>
        <i
          onClick={handleClickModalUpload}
          className="fa fa-times"
          aria-hidden="true"
        ></i>
      </div>

      {uploadPosts.length > 0 &&
        newUploadPosts.map((file, index) => {
          let type = file.name.slice(-4);
          let icon = null;
          switch (type) {
            case ".pdf":
              icon = PDF_TYPE;
              break;
            case ".txt":
              icon = TEXT_TYPE;
              break;
            case "docx":
              icon = DOCX_TYPE;
              break;
            case ".doc":
              icon = DOCX_TYPE;
              break;
            case "pptx":
              icon = PPTX_TYPE;
              break;
            case ".ppt":
              icon = PPTX_TYPE;
              break;
            case "xlsx":
              icon = XLSX_TYPE;
              break;
            default:
              icon = IMAGE_TYPE;
              break;
          }

          return (
            <div key={index} className="modalprogressupload-body">
              <div className="modalprogressupload-title">
                <img src={icon} alt={file.name} />
                <p>{file.name}</p>
              </div>
              <div style={{ width: "35px", height: "35px" }}>
                <CircularProgressbar value={progressUpload} />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ModalProgressUpload;
