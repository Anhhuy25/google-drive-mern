import React from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import {
  PDF_TYPE,
  TEXT_TYPE,
  DOCX_TYPE,
  PPTX_TYPE,
  XLSX_TYPE,
  IMAGE_TYPE,
} from "../../../contexts/constants";
import "../layout.css";

function ModalResult() {
  const {
    postsState: { search },
  } = useGlobalContext();

  // One click to open file
  const openPost = (id, type, postId) => {
    const path = !type
      ? `/dashboard/folder/${postId}`
      : `https://drive.google.com/file/d/${id}/view?usp=sharing`;
    const link = document.createElement("a");
    link.href = path;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {search.length >= 1 ? (
        <>
          {search.map((posts) => {
            let type = posts.filePath
              ? posts.filePath.slice(21).split(".")
              : "";
            let pathId = posts.fileImage
              ? posts.fileImage.slice(38)
              : posts.folderPathId;

            let fileIcon = null;
            switch (type[1]) {
              case "pdf":
                fileIcon = PDF_TYPE;
                break;
              case "txt":
                fileIcon = TEXT_TYPE;
                break;
              case "docx":
                fileIcon = DOCX_TYPE;
                break;
              case "doc":
                fileIcon = DOCX_TYPE;
                break;
              case "pptx":
                fileIcon = PPTX_TYPE;
                break;
              case "ppt":
                fileIcon = PPTX_TYPE;
                break;
              case "xlsx":
                fileIcon = XLSX_TYPE;
                break;
              default:
                fileIcon = IMAGE_TYPE;
                break;
            }
            return (
              <div
                onClick={() => openPost(pathId, type, posts._id)}
                className="resultmodal-container"
                key={posts._id}
              >
                {!type ? (
                  <svg
                    x="0px"
                    y="0px"
                    focusable="false"
                    viewBox="0 0 24 24"
                    height="24px"
                    width="20px"
                    fill="#5f6368"
                  >
                    <g>
                      <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>
                      <path d="M0 0h24v24H0z" fill="none"></path>
                    </g>
                  </svg>
                ) : (
                  <img
                    className="resultmodal-img"
                    src={fileIcon}
                    alt={posts.fileMimeType}
                  />
                )}
                <div className="resultmodal-info">
                  <p>{posts.fileName || posts.folderName}</p>
                  <p>{posts.user.username}</p>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default ModalResult;
