import React from "react";
import { FOLDERS_CHANGE_COLOR } from "../../contexts/constants";
import { useGlobalContext } from "../../contexts/PostsContext";
import { useHistory } from "react-router-dom";
import "./folders.css";

function CreateFolder() {
  const {
    postsState: { folders },
    dispatch,
    setInfo,
    showDetail,
    setShowIconNavbarPost,
    showIconNavbarPost,
    setIsPost,
    setIsDisable,
    setNavValue,
  } = useGlobalContext();
  const history = useHistory();

  const toogleState = (infoFolder) => {
    const updatedFolder = folders.map((folder) => {
      if (folder._id === infoFolder._id) {
        folder.active = true;
        folder.parent = true;
      } else {
        folder.active = false;
        folder.parent = false;
      }
      return folder;
    });
    dispatch({
      type: FOLDERS_CHANGE_COLOR,
      payload: { folders: updatedFolder },
    });
    setInfo(infoFolder);
    setIsPost(false);
    setShowIconNavbarPost(!showIconNavbarPost);
    setIsDisable(true);
  };

  const dbClickFolder = (folder) => {
    history.push(`/dashboard/folder/${folder._id}`);
    setNavValue("My Drive");
  };

  return (
    <div className={`${showDetail ? "grid narrow" : "grid wide"}`}>
      {folders.length > 0 && <h4 className="createfolder-title">Folders</h4>}
      <div className="createfolder-container">
        {folders.map((folder) => {
          return (
            <div
              className={`${showDetail ? "l-4" : "l-3"}`}
              key={folder._id}
              onClick={() => toogleState(folder)}
              onDoubleClick={() => dbClickFolder(folder)}
            >
              <div
                className={`${
                  folder.active
                    ? "createfolder-changecolor"
                    : "createfolder-item"
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
                        ? "createfolder-name-changecolor"
                        : "createfolder-name"
                    }`}
                  >
                    {folder.folderName}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CreateFolder;
