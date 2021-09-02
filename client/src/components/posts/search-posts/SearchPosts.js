import React from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import Loading from "../../views/Loading";
import EmptySearch from "./EmptySearch";
import NavbarSearchPosts from "./NavbarSearchPosts";
import ResultSearchPosts from "./ResultSearchPosts";

function SearchPosts({ location }) {
  const {
    postsState: { searchLoading },
  } = useGlobalContext();
  let body = null;

  if (searchLoading) {
    return <Loading />;
  } else {
    body =
      location.state.search.length < 1 ? (
        <EmptySearch />
      ) : (
        <ResultSearchPosts location={location} />
      );
  }

  return (
    <div>
      <NavbarSearchPosts />
      {body}
    </div>
  );
}

export default SearchPosts;
