import React from "react";
import "./searchposts.css";

function EmptySearch() {
  return (
    <div className="emptysearch-container">
      <div>
        <img
          src="https://ssl.gstatic.com/docs/doclist/images/empty_state_no_search_results_v2.svg"
          alt="search"
          className="emptysearch-img"
        />
      </div>
      <div className="emptysearch-text">
        <p>None of your files or folders matched this search</p>
        <p>
          Try another search, or click the arrow in the search box to find a
          file by type, owner and more
        </p>
      </div>
    </div>
  );
}

export default EmptySearch;
