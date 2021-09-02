import React, { useEffect } from "react";
import { useGlobalContext } from "../../contexts/PostsContext";
import Loading from "../views/Loading";
import DragAndDrop from "./DragAndDrop";
import UploadedPosts from "./UploadedPosts";
import CreateFolder from "../folders/CreateFolder";

function Posts() {
  const {
    postsState: { postsLoading, posts, foldersLoading, folders },
    getAllFolders,
    getAllPosts,
  } = useGlobalContext();
  let body = null;

  useEffect(() => {
    getAllPosts();
    getAllFolders();
  }, []);

  if (postsLoading && foldersLoading) {
    return <Loading />;
  } else {
    body =
      posts.length === 0 && folders.length === 0 ? (
        <DragAndDrop />
      ) : (
        <>
          <CreateFolder />
          <UploadedPosts />
        </>
      );
  }

  return <>{body}</>;
}

export default Posts;
