import React from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import DetailPost from "../DetailPost";
import IconNavbarSearchPosts from "./IconNavbarSearchPosts";
import "./searchposts.css";

function NavbarSearchPosts() {
  const { showDetail, setShowDetail, showIconNavbarSearchPost } =
    useGlobalContext();

  return (
    <div className="navbarsearchposts-container">
      <div className="navbarsearchposts-title">
        <p>Search result</p>
      </div>

      <div>
        <div className="navbarsearchposts-icon">
          {showIconNavbarSearchPost && (
            <div className="navbarsearchpostsicon-container">
              <IconNavbarSearchPosts />
            </div>
          )}
          <div
            className="navbarsearchposts-detail"
            onClick={() => setShowDetail(!showDetail)}
          >
            <i className="fa fa-info-circle" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      {showDetail && <DetailPost />}
    </div>
  );
}

export default NavbarSearchPosts;
