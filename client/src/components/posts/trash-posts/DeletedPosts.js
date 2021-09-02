import React from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import {
  DELETED_POSTS_CHANGE_COLOR,
  PDF_TYPE,
  TEXT_TYPE,
  DOCX_TYPE,
  PPTX_TYPE,
  XLSX_TYPE,
  IMAGE_TYPE,
} from "../../../contexts/constants";
import "./trashposts.css";

function DeletedPosts() {
  const {
    postsState: { deletedPosts },
    dispatch,
    setInfo,
    showDetail,
    showIconNavbarTrashPost,
    setShowIconNavbarTrashPost,
    setIsPost,
  } = useGlobalContext();

  const toggleState = (id, post, icon, type) => {
    const updatedPosts = deletedPosts.map((post) => {
      if (post._id === id) {
        post.active = true;
      } else {
        post.active = false;
      }
      return post;
    });
    dispatch({
      type: DELETED_POSTS_CHANGE_COLOR,
      payload: { deletedPosts: updatedPosts },
    });
    post.fileIcon = icon;
    post.fileType = type;
    setInfo(post);
    setIsPost(true);
    setShowIconNavbarTrashPost(!showIconNavbarTrashPost);
  };

  return (
    <>
      <div className={`${showDetail ? "grid narrow" : "grid wide"}`}>
        <div className="deletedposts-container">
          {deletedPosts.map((post) => {
            const { _id, fileName, fileImage, filePath, active } = post;
            let type = filePath.slice(21).split(".");
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
                onClick={() => toggleState(_id, post, fileIcon, fileType)}
              >
                <div
                  className={`${
                    active ? "deletedposts-changecolor" : "deletedposts-item"
                  }`}
                >
                  <div className="deletedposts-image">
                    <img src={fileImage} alt={fileName} />
                  </div>
                  <div className="deletedposts-detail">
                    <img src={fileIcon} alt={fileName} />
                    <p
                      className={`${
                        active
                          ? "deletedposts-filename-changecolor"
                          : "deletedposts-filename"
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
    </>
  );
}

export default DeletedPosts;
