import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../contexts/PostsContext";
import UploadTable from "../posts/UploadTable";
import ModalCreateFolder from "../folders/modal/ModalCreateFolder";
import "./layout.css";

function Navbar() {
  const { showModal, setShowModal, modalCreateFolder, navValue, setNavValue } =
    useGlobalContext();
  const modalRef = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu, then close the menu
      if (
        showModal &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showModal]);

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-file-upload">
          <button
            onClick={() => setShowModal(!showModal)}
            className="navbar-file-upload-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
            >
              <path fill="#34A853" d="M16 16v14h4V20z" />
              <path fill="#4285F4" d="M30 16H20l-4 4h14z" />
              <path fill="#FBBC05" d="M6 16v4h10l4-4z" />
              <path fill="#EA4335" d="M20 16V6h-4v14z" />
              <path fill="none" d="M0 0h36v36H0z" />
            </svg>
            <span>New</span>
          </button>
        </div>
        {showModal && <UploadTable modalRef={modalRef} />}

        <div
          onClick={() => setNavValue("My Drive")}
          className={`${
            navValue === "My Drive"
              ? "navbar-active navbar-mydrive"
              : "navbar-mydrive"
          }`}
        >
          <Link
            to="/dashboard"
            className={`${
              navValue === "My Drive"
                ? "navbar-active-color"
                : "navbar-mydrive-link"
            }`}
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill={`${navValue === "My Drive" ? "#1967d6" : "#000000"}`}
              focusable="false"
            >
              <path d="M19 2H5C3.9 2 3 2.9 3 4V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V4C21 2.9 20.1 2 19 2ZM19 20H5V19H19V20ZM19 17H5V4H19V17Z"></path>
              <path d="M13.1215 6H10.8785C10.5514 6 10.271 6.18692 10.0841 6.46729L7.14019 11.6075C7 11.8878 7 12.215 7.14019 12.4953L8.26168 14.4579C8.40187 14.7383 8.72897 14.9252 9.05608 14.9252H15.0374C15.3645 14.9252 15.6449 14.7383 15.8318 14.4579L16.9533 12.4953C17.0935 12.215 17.0935 11.8878 16.9533 11.6075L13.9159 6.46729C13.7757 6.18692 13.4486 6 13.1215 6ZM10.1776 12.0748L12.0467 8.8972L13.8692 12.0748H10.1776Z"></path>
            </svg>
            <span>My Drive</span>
          </Link>
        </div>

        <div
          onClick={() => setNavValue("Starred")}
          className={`${
            navValue === "Starred"
              ? "navbar-active navbar-starred"
              : "navbar-starred"
          }`}
        >
          <Link
            to="/starred"
            className={`${
              navValue === "Starred"
                ? "navbar-active-color"
                : "navbar-starred-link"
            }`}
          >
            <i className="far fa-star"></i>
            <span>Starred</span>
          </Link>
        </div>

        <div
          onClick={() => setNavValue("Trash")}
          className={`${
            navValue === "Trash" ? "navbar-active navbar-trash" : "navbar-trash"
          }`}
        >
          <Link
            to="/trash"
            className={`${
              navValue === "Trash" ? "navbar-active-color" : "navbar-trash-link"
            }`}
          >
            <i className="fas fa-trash-alt"></i>
            <span>Trash</span>
          </Link>
        </div>
      </div>

      {/* Modal create folder */}
      {modalCreateFolder && (
        <div className="modal-overlay show-modal">
          <div className="modalcreatefolder-container">
            <ModalCreateFolder />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
