import React from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import AddStarrFolders from "../../folders/AddStarrFolders";
import AddStarrPosts from "./AddStarrPosts";
import EmptyStarr from "./EmptyStarr";
import Loading from "../../views/Loading";
import AddStarrInsideFPs from "../../folders/inside/AddStarrInsideFPs";
import AddStarrFoldersInside from "../../folders/inside/folders/AddStarrFoldersInside";

function StarredPosts() {
  const {
    postsState: {
      starredPostsLoading,
      starredPosts,
      starredFolders,
      starredFoldersLoading,
      starredInsideFPs,
      starredInsideFPsLoading,
      starredInsideFFsLoading,
      starredInsideFFs,
    },
  } = useGlobalContext();
  let body = null;

  if (
    starredPostsLoading &&
    starredFoldersLoading &&
    starredInsideFPsLoading &&
    starredInsideFFsLoading
  ) {
    return <Loading />;
  } else {
    body =
      starredPosts.length === 0 &&
      starredFolders.length === 0 &&
      starredInsideFPs.length === 0 &&
      starredInsideFFs.length === 0 ? (
        <EmptyStarr />
      ) : (
        <>
          <AddStarrFolders />
          <AddStarrFoldersInside />
          <AddStarrPosts />
          <AddStarrInsideFPs />
        </>
      );
  }

  return <div>{body}</div>;
}

export default StarredPosts;
