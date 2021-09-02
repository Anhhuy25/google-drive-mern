import React from "react";
import {
  PDF_TYPE,
  TEXT_TYPE,
  DOCX_TYPE,
  PPTX_TYPE,
  XLSX_TYPE,
  IMAGE_TYPE,
  STARRED_POSTS_CHANGE_COLOR,
} from "../../../contexts/constants";
import { useGlobalContext } from "../../../contexts/PostsContext";

function AddStarrPosts() {
  const {
    postsState: { starredPosts },
    dispatch,
    setInfo,
    showDetail,
    showIconNavbarStarredPost,
    setShowIconNavbarStarredPost,
    setIsPost,
  } = useGlobalContext();

  const toggleState = (id, post, icon, type) => {
    const updatedPosts = starredPosts.map((post) => {
      if (post._id === id) {
        post.active = true;
      } else {
        post.active = false;
      }
      return post;
    });
    dispatch({
      type: STARRED_POSTS_CHANGE_COLOR,
      payload: { starredPosts: updatedPosts },
    });
    post.fileIcon = icon;
    post.fileType = type;
    setInfo(post);
    setIsPost(true);
    setShowIconNavbarStarredPost(!showIconNavbarStarredPost);
  };

  return (
    <>
      <div className={`${showDetail ? "grid narrow" : "grid wide"}`}>
        <div className="starredposts-container">
          {starredPosts.map((post) => {
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
                    active ? "starredposts-changecolor" : "starredposts-item"
                  }`}
                >
                  <div className="starredposts-image">
                    <img src={fileImage} alt={fileName} />
                  </div>
                  <div className="starredposts-detail">
                    <img src={fileIcon} alt={fileName} />
                    <p
                      className={`${
                        active
                          ? "starredposts-filename-changecolor"
                          : "starredposts-filename"
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

export default AddStarrPosts;
