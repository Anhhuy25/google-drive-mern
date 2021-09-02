import React from "react";
import {
  IMAGE_TYPE,
  PDF_TYPE,
  TEXT_TYPE,
  DOCX_TYPE,
  PPTX_TYPE,
  XLSX_TYPE,
  INSIDEFOLDERS_POSTS_CHANGE_COLOR,
} from "../../../contexts/constants";
import { useGlobalContext } from "../../../contexts/PostsContext";
import ModalSepaOrUpda from "../../posts/navbar-post/ModalSepaOrUpda";
import "../../../grid.css";
import "./inside.css";

function UploadPostsInside({ id }) {
  const {
    postsState: { insideFolders_Posts },
    dispatch,
    setInfo,
    showDetail,
    setShowIconNavbarPost,
    modalSepaOrUpda,
    setIsInsideFP,
    setIsDisable,
  } = useGlobalContext();

  // Kiem tra dang o trong folder cha nao thi khi up file moi hien title
  const checkId = insideFolders_Posts
    .map((post) => post.folder)
    .find((listId) => listId === id);

  // One click to change color
  const toggleState = (id, post, icon, type, link) => {
    const updatedPosts = insideFolders_Posts.map((post) => {
      if (post._id === id) {
        post.active = true;
        post.children = true;
      } else {
        post.active = false;
        post.children = false;
      }
      return post;
    });
    dispatch({
      type: INSIDEFOLDERS_POSTS_CHANGE_COLOR,
      payload: { insideFolders_Posts: updatedPosts },
    });
    post.fileIcon = icon;
    post.fileType = type;
    post.fileLinkDownload = link;
    setInfo(post);
    setShowIconNavbarPost(true);
    setIsInsideFP(true);
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
        {checkId === id ? (
          <h4 className="uploadedpostsinside-title">Files</h4>
        ) : (
          ""
        )}
        <div className="uploadedpostsinside-container">
          {insideFolders_Posts.map((post) => {
            const {
              _id,
              fileName,
              fileImage,
              filePath,
              fileLinkDownload,
              active,
              folder,
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

            if (folder === id) {
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
                        ? "uploadedpostsinside-changecolor"
                        : "uploadedpostsinside-item"
                    }`}
                  >
                    <div className="uploadedpostsinside-image">
                      <img src={fileImage} alt={fileName} />
                    </div>
                    <div className="uploadedpostsinside-detail">
                      <img src={fileIcon} alt={fileName} />
                      <p
                        className={`${
                          active
                            ? "uploadedpostsinside-filename-changecolor"
                            : "uploadedpostsinside-filename"
                        }`}
                      >
                        {fileName}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
            return "";
          })}
        </div>
      </div>

      {modalSepaOrUpda && (
        <div className="modal-overlay show-modal">
          <div className="modalsepaorupda-container">
            <ModalSepaOrUpda id={id} />
          </div>
        </div>
      )}
    </>
  );
}

export default UploadPostsInside;
