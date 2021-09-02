import React, { useEffect } from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import Loading from "../../views/Loading";
import DADInsideFolders from "./DADInsideFolders";
import CreateFoldersInside from "./folders/CreateFoldersInside";
import UploadPostsInside from "./UploadPostsInside";

function InsideBody({ id }) {
  const {
    postsState: {
      insideFoldersPostsLoading,
      insideFolders_Posts,
      insideFolders_Folders,
      insideFoldersFoldersLoading,
    },
    getInsideFoldersAllFolders,
    getInsideFoldersAllPosts,
  } = useGlobalContext();
  let body = null;

  useEffect(() => {
    getInsideFoldersAllPosts();
    getInsideFoldersAllFolders();
  }, []);

  if (insideFoldersPostsLoading && insideFoldersFoldersLoading) {
    return <Loading />;
  } else {
    body =
      insideFolders_Posts.length === 0 && insideFolders_Folders.length === 0 ? (
        <DADInsideFolders id={id} />
      ) : (
        <>
          <CreateFoldersInside id={id} />
          <UploadPostsInside id={id} />
        </>
      );
  }

  return <>{body}</>;
}

export default InsideBody;
