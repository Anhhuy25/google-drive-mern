import React, { useEffect } from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import DeletedFolders from "../../folders/DeletedFolders";
import Loading from "../../views/Loading";
import DeletedPosts from "./DeletedPosts";
import EmptyTrash from "./EmptyTrash";
import DeletedInsideFPs from "../../folders/inside/DeletedInsideFPs";
import DeleteFoldersInside from "../../folders/inside/folders/DeleteFoldersInside";

function TrashPosts() {
  const {
    postsState: {
      deletedPostsLoading,
      deletedPosts,
      deletedFoldersLoading,
      deletedFolders,
      deletedInsideFPsLoading,
      deletedInsideFFsLoading,
      deletedInsideFPs,
      deletedInsideFFs,
    },
    // getDeletedInsideFFs,
    // getDeletedInsideFPs,
    getDeletedPosts,
    getDeletedFolders,
  } = useGlobalContext();
  let body = null;

  useEffect(() => {
    getDeletedPosts();
    getDeletedFolders();
  }, []);

  if (
    deletedPostsLoading &&
    deletedFoldersLoading &&
    deletedInsideFPsLoading &&
    deletedInsideFFsLoading
  ) {
    return <Loading />;
  } else {
    body =
      deletedPosts.length === 0 &&
      deletedFolders.length === 0 &&
      deletedInsideFPs.length === 0 &&
      deletedInsideFFs.length === 0 ? (
        <EmptyTrash />
      ) : (
        <>
          <DeletedFolders />
          <DeleteFoldersInside />
          <DeletedPosts />
          <DeletedInsideFPs />
        </>
      );
  }

  return <>{body}</>;
}

export default TrashPosts;
