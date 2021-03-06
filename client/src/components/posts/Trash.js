import React, { useEffect } from "react";
import { useGlobalContext } from "../../contexts/PostsContext";
import HomeSearchLogOut from "../layout/HomeSearchLogOut";
import TrashBody from "../views/TrashBody";

function Trash() {
  const {
    getDeletedPosts,
    getDeletedFolders,
    setNavValue,
    getDeletedInsideFPs,
    getDeletedInsideFFs,
  } = useGlobalContext();

  useEffect(() => {
    getDeletedPosts();
    getDeletedFolders();
    getDeletedInsideFPs();
    getDeletedInsideFFs();
    setNavValue("Trash");
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <HomeSearchLogOut />
      <TrashBody />
    </>
  );
}

export default Trash;
