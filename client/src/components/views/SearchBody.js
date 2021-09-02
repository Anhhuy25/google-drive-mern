import React from "react";
import Navbar from "../layout/Navbar";
import SearchPosts from "../posts/search-posts/SearchPosts";
import "../../grid.css";

function SearchBody({ location }) {
  return (
    <div style={{ display: "flex" }}>
      <div className="l-2">
        <Navbar />
      </div>
      <div className="l-10">
        <SearchPosts location={location} />
      </div>
    </div>
  );
}

export default SearchBody;
