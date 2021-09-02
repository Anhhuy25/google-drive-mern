import React from "react";
import { STARRED_FOLDERS_CHANGE_COLOR } from "../../contexts/constants";
import { useGlobalContext } from "../../contexts/PostsContext";
import "./folders.css";

function AddStarrFolders() {
  const {
    showDetail,
    setInfo,
    showIconNavbarStarredPost,
    setShowIconNavbarStarredPost,
    postsState: { starredFolders },
    dispatch,
    setIsPost,
  } = useGlobalContext();

  const toggleState = (infoFolder) => {
    const updatedFolders = starredFolders.map((folder) => {
      if (folder._id === infoFolder._id) {
        folder.active = true;
      } else {
        folder.active = false;
      }
      return folder;
    });
    dispatch({
      type: STARRED_FOLDERS_CHANGE_COLOR,
      payload: { starredFolders: updatedFolders },
    });
    setInfo(infoFolder);
    setIsPost(false);
    setShowIconNavbarStarredPost(!showIconNavbarStarredPost);
  };

  return (
    <>
      <div className={`${showDetail ? "grid narrow" : "grid wide"}`}>
        <div className="starredfolders-container">
          {starredFolders.map((folder) => {
            return (
              <div
                className={`${showDetail ? "l-4" : "l-3"}`}
                key={folder._id}
                onClick={() => toggleState(folder)}
              >
                <div className="starredfolders-item">
                  <div className="starredfolders-image">
                    <svg
                      x="0px"
                      y="0px"
                      focusable="false"
                      viewBox="0 0 24 24"
                      height="24px"
                      width="24px"
                      fill="#5f6368"
                    >
                      <g>
                        <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>
                        <path d="M0 0h24v24H0z" fill="none"></path>
                      </g>
                    </svg>
                  </div>
                  <div
                    className={`${
                      folder.active
                        ? "starredfolders-detail-changecolor"
                        : "starredfolders-detail"
                    }`}
                  >
                    <svg
                      x="0px"
                      y="0px"
                      focusable="false"
                      viewBox="0 0 24 24"
                      height="24px"
                      width="24px"
                      fill="#5f6368"
                    >
                      <g>
                        <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>
                        <path d="M0 0h24v24H0z" fill="none"></path>
                      </g>
                    </svg>

                    <p
                      className={`${
                        folder.active
                          ? "starredfolders-filename-changecolor"
                          : "starredfolders-filename"
                      }`}
                    >
                      {folder.folderName}
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

export default AddStarrFolders;
