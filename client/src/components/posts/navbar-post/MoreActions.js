import React from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";

function MoreActions({ actionsRef }) {
  const {
    info,
    setShowDetail,
    setModalRename,
    addStarredPosts,
    setShowMoreActions,
    setModalAddStarr,
    removeStarredPosts,
    isPost,
    addStarredFolders,
    removeStarredFolders,
    isInsideFP,
    addStarredInsideFPs,
    removeStarredInsideFPs,
    addStarredInsideFFs,
    removeStarredInsideFFs,
    isDisable,
  } = useGlobalContext();

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddStarrPost = async () => {
    if (isPost) {
      await addStarredPosts(info);
    } else {
      await addStarredFolders(info);
    }
    if (isInsideFP) {
      await addStarredInsideFPs(info);
    } else {
      await addStarredInsideFFs(info);
    }
    setShowMoreActions(false);
    setModalAddStarr(true);
  };

  const handleRemoveStarrPost = async () => {
    if (isPost) {
      await removeStarredPosts(info);
    } else {
      await removeStarredFolders(info);
    }
    if (isInsideFP) {
      await removeStarredInsideFPs(info);
    } else {
      await removeStarredInsideFFs(info);
    }
    setShowMoreActions(false);
    setModalAddStarr(true);
  };

  const handleStarrPost = () => {
    if (info.isStarred === 0) {
      handleAddStarrPost();
    } else {
      handleRemoveStarrPost();
    }
  };

  return (
    <>
      <div ref={actionsRef} className="moreactions-container">
        <div className="moreactions-top">
          <div onClick={handleStarrPost} className="moreactions-starred">
            {info.isStarred === 0 ? (
              <i className="far fa-star"></i>
            ) : (
              <i className="fas fa-star"></i>
            )}
            <span>
              {info.isStarred === 0 ? "Add to Starred" : "Remove from Starred"}
            </span>
          </div>
          <div
            onClick={() => setModalRename(true)}
            className="moreactions-rename"
          >
            <i className="fas fa-edit"></i>
            <span>Rename</span>
          </div>
        </div>
        <div className="moreactions-bottom">
          <div
            onClick={() => setShowDetail(true)}
            className="moreactions-detail"
          >
            <i className="fa fa-info-circle"></i>
            <span>View details</span>
          </div>
          <div
            className="moreactions-download"
            onClick={() => handleDownload(info.fileLinkDownload)}
            disabled={isDisable}
          >
            <i className="fa fa-download" aria-hidden="true"></i>
            <span>Download</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoreActions;
