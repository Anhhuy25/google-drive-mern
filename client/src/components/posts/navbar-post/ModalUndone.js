import React from "react";
import { useGlobalContext } from "../../../contexts/PostsContext";
import "../posts.css";

function ModalUndone() {
  const { setModalUndone } = useGlobalContext();

  return (
    <div className="modalundone-container">
      <span>Action undone</span>
      <button className="modalundone-btnclose">
        <i
          onClick={() => setModalUndone(false)}
          className="fa fa-times"
          aria-hidden="true"
        ></i>
      </button>
    </div>
  );
}

export default ModalUndone;
