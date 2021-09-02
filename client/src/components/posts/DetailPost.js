import React from "react";
import { useGlobalContext } from "../../contexts/PostsContext";

const formatDate = (date) => {
  let format = new Date(`${date}`);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(format);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(format);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(format);
  return { ye, mo, da };
};

function DetailPost() {
  const { showDetail, setShowDetail, info } = useGlobalContext();

  return (
    <div
      className={`${
        showDetail ? "detailpost-container active" : "detailpost-container"
      }`}
    >
      {info === null ? (
        <div>
          <div className="detailpost-title">
            <div className="detailpost-empty">
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="#000000"
                focusable="false"
              >
                <path d="M19 2H5C3.9 2 3 2.9 3 4V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V4C21 2.9 20.1 2 19 2ZM19 20H5V19H19V20ZM19 17H5V4H19V17Z"></path>
                <path d="M13.1215 6H10.8785C10.5514 6 10.271 6.18692 10.0841 6.46729L7.14019 11.6075C7 11.8878 7 12.215 7.14019 12.4953L8.26168 14.4579C8.40187 14.7383 8.72897 14.9252 9.05608 14.9252H15.0374C15.3645 14.9252 15.6449 14.7383 15.8318 14.4579L16.9533 12.4953C17.0935 12.215 17.0935 11.8878 16.9533 11.6075L13.9159 6.46729C13.7757 6.18692 13.4486 6 13.1215 6ZM10.1776 12.0748L12.0467 8.8972L13.8692 12.0748H10.1776Z"></path>
              </svg>
              <p>My Drive</p>
            </div>
            <i
              onClick={() => setShowDetail(false)}
              className="fa fa-times"
              aria-hidden="true"
            ></i>
          </div>

          <div className="detailpost-selectfile">
            <svg
              width="107px"
              height="82px"
              viewBox="0 0 107 82"
              focusable="false"
            >
              <path
                className="a-s-fa-Ha-pa"
                fill="#000000"
                d="M0,4a4,4,0,0,1,4,-4h89a4,4,0,0,1,4,4v18.5l-23.5,40.5h-69.5a4,4,0,0,1,-4,-4ZM74.5,65l23,-39.15l1,0l7,4.1l1,1l-23,39.15ZM74,65.8l9.5,5.5l-9,4ZM97,51v8a4,4,0,0,1,-4,4h-3ZM21,63v19l23,-19Z"
              ></path>
            </svg>
          </div>
          <p className="detailpost-selectfilemsg">
            Select a file or folder to view its details
          </p>
        </div>
      ) : (
        <div>
          <div className="detailpost-title">
            <div className="detailpost-iconname">
              {info.fileIcon ? (
                <img src={info.fileIcon} alt={info.fileType} />
              ) : (
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
              )}
              <p>{info.folderName || info.fileName}</p>
            </div>
            <i
              onClick={() => setShowDetail(false)}
              className="fa fa-times"
              aria-hidden="true"
            ></i>
          </div>

          <div className="detailpost-img">
            {info.fileImage ? (
              <img src={info.fileImage} alt={info.fileName} />
            ) : (
              <svg version="1.1" focusable="false" viewBox="0 0 128 128">
                <g>
                  <path
                    fill="#5f6368"
                    d="M128.145,47.954V24.681c0-1.926-1.562-3.49-3.491-3.49H48.932 c0,0-1.563-8.146-3.491-8.146H3.491C1.563,13.045,0,14.608,0,16.536v8.145v2.328v20.945"
                  ></path>
                  <path
                    opacity="0.33"
                    d="M128.145,47.954V24.681c0-1.926-1.562-3.49-3.491-3.49H48.932 c0,0-1.563-8.146-3.491-8.146H3.491C1.563,13.045,0,14.608,0,16.536v8.145v2.328v20.945"
                  ></path>
                  <path
                    fill="#5f6368"
                    d="M120,32.827H8.145C3.647,32.827,0,36.474,0,40.973v67.491 c0,1.929,1.563,3.491,3.491,3.491h121.162 c1.929,0,3.491-1.562,3.491-3.491V40.973C128.145,36.474,124.498,32.827,120,32.827z"
                  ></path>
                </g>
              </svg>
            )}
          </div>

          <table className="detailpost-info">
            <tbody>
              <tr>
                <td>Type</td>
                <td>{info.folderType || info.fileType}</td>
              </tr>
              {info.fileSize && (
                <tr>
                  <td>Size</td>
                  <td>{info.fileSize}</td>
                </tr>
              )}
              <tr>
                <td>Owner</td>
                <td>Me</td>
              </tr>
              <tr>
                <td>Created</td>
                <td>
                  <span>{formatDate(info.createdAt).mo}</span>
                  <span> {formatDate(info.createdAt).da},</span>
                  <span> {formatDate(info.createdAt).ye}</span>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Modified</td>
                <td>
                  <span>{formatDate(info.updatedAt).mo}</span>
                  <span> {formatDate(info.updatedAt).da},</span>
                  <span> {formatDate(info.updatedAt).ye}</span>
                </td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DetailPost;
