import React from "react";
import { INSIDEFOLDERS_FOLDERS_CHANGE_COLOR } from "../../../../contexts/constants";
import { useGlobalContext } from "../../../../contexts/PostsContext";
import "../inside.css";

function CreateFoldersInside({ id }) {
  const {
    postsState: { insideFolders_Folders },
    dispatch,
    setInfo,
    showDetail,
    setShowIconNavbarPost,
    showIconNavbarPost,
    setIsInsideFP,
    setIsDisable,
  } = useGlobalContext();

  // Kiem tra dang o trong folder cha nao thi khi tao folder moi hien title
  const checkId = insideFolders_Folders
    .map((folder) => folder.folder)
    .find((listId) => listId === id);

  const toogleState = (infoFolder) => {
    const updatedFolder = insideFolders_Folders.map((folder) => {
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
      type: INSIDEFOLDERS_FOLDERS_CHANGE_COLOR,
      payload: { insideFolders_Folders: updatedFolder },
    });
    setInfo(infoFolder);
    setIsInsideFP(false);
    setIsDisable(true);
    setShowIconNavbarPost(!showIconNavbarPost);
  };

  return (
    <div className={`${showDetail ? "grid narrow" : "grid wide"}`}>
      {checkId === id && <h4 className="createfoldersinside-title">Folders</h4>}
      <div className="createfoldersinside-container">
        {insideFolders_Folders.map((folder) => {
          if (folder.folder === id) {
            return (
              <div
                className={`${showDetail ? "l-4" : "l-3"}`}
                key={folder._id}
                onClick={() => toogleState(folder)}
                //   onDoubleClick={() => dbClickFolder(folder)}
              >
                <div
                  className={`${
                    folder.active
                      ? "createfoldersinside-changecolor"
                      : "createfoldersinside-item"
                  }`}
                >
                  <div>
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
                    <span
                      className={`${
                        folder.active
                          ? "createfoldersinside-name-changecolor"
                          : "createfoldersinside-name"
                      }`}
                    >
                      {folder.folderName}
                    </span>
                  </div>
                </div>
              </div>
            );
          }
          return "";
        })}
      </div>
    </div>
  );
}

export default CreateFoldersInside;
