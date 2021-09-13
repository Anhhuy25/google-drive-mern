import React from "react";
import {
  IMAGE_TYPE,
  PDF_TYPE,
  TEXT_TYPE,
  DOCX_TYPE,
  PPTX_TYPE,
  XLSX_TYPE,
  POSTS_CHANGE_COLOR,
} from "../../contexts/constants";
import { useGlobalContext } from "../../contexts/PostsContext";
import { useGlobalContextAuth } from "../../contexts/AuthContext";
import ModalSepaOrUpda from "./navbar-post/ModalSepaOrUpda";
import "../../grid.css";
import "./posts.css";

function UploadedPosts() {
  const {
    postsState: { posts },
    dispatch,
    setInfo,
    showDetail,
    setShowIconNavbarPost,
    modalSepaOrUpda,
    setIsPost,
    setIsDisable,
  } = useGlobalContext();
  const {
    authState: { user },
  } = useGlobalContextAuth();

  // One click to change color
  const toggleState = (id, post, icon, type, link) => {
    const updatedPosts = posts.map((post) => {
      if (post._id === id) {
        post.active = true;
      } else {
        post.active = false;
      }
      return post;
    });
    dispatch({ type: POSTS_CHANGE_COLOR, payload: { posts: updatedPosts } });
    post.fileIcon = icon;
    post.fileType = type;
    post.fileLinkDownload = link;
    setInfo(post);
    setShowIconNavbarPost(true);
    setIsPost(true);
    setIsDisable(false);
  };

  // Double click to open file
  const openPost = (id) => {
    const path = `https://drive.google.com/file/d/${id}/view?usp=sharing`;
    const link = document.createElement("a");
    link.href = path;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className={`${showDetail ? "grid narrow" : "grid wide"}`}>
        {posts.length > 0 && <h4 className="uploadedposts-title">Files</h4>}
        <div className="uploadedposts-container">
          {posts
            .filter((post) => post.user._id === user._id)
            .map((post) => {
              const {
                _id,
                fileName,
                fileImage,
                filePath,
                fileLinkDownload,
                active,
              } = post;

              let type = filePath.slice(21).split(".");
              let pathId = fileImage.slice(38);
              let fileIcon = null;
              let fileType = null;
              switch (type[1]) {
                case "pdf":
                  fileIcon = PDF_TYPE;
                  fileType = "PDF";
                  break;
                case "txt":
                  fileIcon = TEXT_TYPE;
                  fileType = "Text";
                  break;
                case "docx":
                  fileIcon = DOCX_TYPE;
                  fileType = "Word";
                  break;
                case "doc":
                  fileIcon = DOCX_TYPE;
                  fileType = "Word";
                  break;
                case "pptx":
                  fileIcon = PPTX_TYPE;
                  fileType = "PowerPoint";
                  break;
                case "ppt":
                  fileIcon = PPTX_TYPE;
                  fileType = "PowerPoint";
                  break;
                case "xlsx":
                  fileIcon = XLSX_TYPE;
                  fileType = "Excel";
                  break;
                default:
                  fileIcon = IMAGE_TYPE;
                  fileType = "Image";
                  break;
              }

              return (
                <div
                  className={`${showDetail ? "l-4" : "l-3"}`}
                  key={_id}
                  onClick={() =>
                    toggleState(_id, post, fileIcon, fileType, fileLinkDownload)
                  }
                  onDoubleClick={() => openPost(pathId)}
                >
                  <div
                    className={`${
                      active
                        ? "uploadedposts-changecolor"
                        : "uploadedposts-item"
                    }`}
                  >
                    <div className="uploadedposts-image">
                      <img src={fileImage} alt={fileName} />
                    </div>
                    <div className="uploadedposts-detail">
                      <img src={fileIcon} alt={fileName} />
                      <p
                        className={`${
                          active
                            ? "uploadedposts-filename-changecolor"
                            : "uploadedposts-filename"
                        }`}
                      >
                        {fileName}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {modalSepaOrUpda && (
        <div className="modal-overlay show-modal">
          <div className="modalsepaorupda-container">
            <ModalSepaOrUpda />
          </div>
        </div>
      )}
    </>
  );
}

export default UploadedPosts;
