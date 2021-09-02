import React from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import {
  PDF_TYPE,
  TEXT_TYPE,
  DOCX_TYPE,
  PPTX_TYPE,
  XLSX_TYPE,
  IMAGE_TYPE,
  SEARCH_CHANGE_COLOR,
} from "../../../contexts/constants";

function ResultSearchPosts({ location }) {
  const {
    showDetail,
    dispatch,
    setInfo,
    showIconNavbarSearchPost,
    setShowIconNavbarSearchPost,
    setIsPost,
  } = useGlobalContext();

  const toggleState = (search, type, icon) => {
    const updatedPosts = location.state.search.map((post) => {
      if (post._id === search._id) {
        post.active = true;
      } else {
        post.active = false;
      }
      return post;
    });
    dispatch({
      type: SEARCH_CHANGE_COLOR,
      payload: { search: updatedPosts },
    });
    search.fileIcon = icon;
    search.fileType = type;
    setInfo(search);
    setIsPost(true);
    setShowIconNavbarSearchPost(!showIconNavbarSearchPost);
  };

  return (
    <>
      <div className={`${showDetail ? "grid narrow" : "grid wide"}`}>
        <div className="search-container">
          {location.state.search.map((search) => {
            let type = search.filePath
              ? search.filePath.slice(21).split(".")
              : "";
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
                key={search._id}
                onClick={() => toggleState(search, fileType, fileIcon)}
              >
                <div
                  className={`${
                    search.active ? "search-changecolor" : "search-item"
                  }`}
                >
                  <div className="search-image">
                    {search.fileImage ? (
                      <img src={search.fileImage} alt={search.fileName} />
                    ) : (
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
                    )}
                  </div>
                  <div className="search-detail">
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
                      <img src={fileIcon} alt={search.fileName} />
                    )}
                    <p
                      className={`${
                        search.active
                          ? "search-filename-changecolor"
                          : "search-filename"
                      }`}
                    >
                      {search.fileName || search.folderName}
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

export default ResultSearchPosts;
