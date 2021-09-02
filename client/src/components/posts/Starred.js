import React, { useEffect } from "react";
import { useGlobalContext } from "../../contexts/PostsContext";
import HomeSearchLogOut from "../layout/HomeSearchLogOut";
import StarredBody from "../views/StarredBody";

function Starred() {
  const {
    getStarredPosts,
    getStarredFolders,
    getStarredInsideFPs,
    getStarredInsideFFs,
    setNavValue,
  } = useGlobalContext();

  useEffect(() => {
    getStarredPosts();
    getStarredFolders();
    getStarredInsideFPs();
    getStarredInsideFFs();
    setNavValue("Starred");
  }, []);

  return (
    <>
      <HomeSearchLogOut />
      <StarredBody />
    </>
  );
}

export default Starred;
