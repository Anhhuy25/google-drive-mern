import React from "react";
import { DELETED_INSIDE_FOLDERS_FOLDERS_CHANGE_COLOR } from "../../../../contexts/constants";
import { useGlobalContext } from "../../../../contexts/PostsContext";

function DeleteFoldersInside() {
  const {
    postsState: { deletedInsideFFs },
    showDetail,
    setInfo,
    setShowIconNavbarTrashPost,
    showIconNavbarTrashPost,
    dispatch,
    setIsInsideFP,
  } = useGlobalContext();

  const toggleState = (infoFolder) => {
    const updatedFolders = deletedInsideFFs.map((folder) => {
      if (folder._id === infoFolder._id) {
        folder.active = true;
        folder.children = true;
      } else {
        folder.active = false;
        folder.children = false;
      }
      return folder;
    });
    dispatch({
      type: DELETED_INSIDE_FOLDERS_FOLDERS_CHANGE_COLOR,
      payload: { deletedInsideFFs: updatedFolders },
    });
    setInfo(infoFolder);
    setIsInsideFP(false);
    setShowIconNavbarTrashPost(!showIconNavbarTrashPost);
  };

  return (
    <div className={`${showDetail ? "grid narrow" : "grid wide"}`}>
      <div className="deletedInsideFFs-container">
        {deletedInsideFFs.map((folder) => {
          return (
            <div
              className={`${showDetail ? "l-4" : "l-3"}`}
              key={folder._id}
              onClick={() => toggleState(folder)}
            >
              <div className="deletedInsideFFs-item">
                <div className="deletedInsideFFs-image">
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
                      ? "deletedInsideFFs-detail-changecolor"
                      : "deletedInsideFFs-detail"
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
                        ? "deletedInsideFFs-filename-changecolor"
                        : "deletedInsideFFs-filename"
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
  );
}

export default DeleteFoldersInside;
