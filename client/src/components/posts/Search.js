import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../../contexts/PostsContext";
import HomeSearchLogOut from "../layout/HomeSearchLogOut";
import SearchBody from "../views/SearchBody";

function Search() {
  const location = useLocation();
  const { searchFile } = useGlobalContext();

  useEffect(() => {
    searchFile();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <HomeSearchLogOut />
      <SearchBody location={location} />
    </>
  );
}

export default Search;
