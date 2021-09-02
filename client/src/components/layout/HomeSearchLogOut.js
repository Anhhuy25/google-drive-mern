import React, { useEffect, useRef, useState } from "react";
import { useGlobalContextAuth } from "../../contexts/AuthContext";
import { useGlobalContext } from "../../contexts/PostsContext";
import { useHistory } from "react-router";
import Dropdown from "./Dropdown";
import ModalResult from "./modal/ModalResult";
import useDebounce from "../../custom hooks/useDebounce";
import "../../grid.css";
import "./layout.css";

function HomeSearchLogOut() {
  const {
    authState: {
      user: { username },
    },
  } = useGlobalContextAuth();
  const {
    searchValue,
    setSearchValue,
    searchFile,
    postsState: { search },
  } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);
  const [modalResult, setModalResult] = useState(false);
  const history = useHistory();
  const resultRef = useRef();
  const accountRef = useRef();
  const debounceSearchValue = useDebounce(searchValue, 1000);

  // Khi user nhap ten tren thanh input va nhan enter
  const handleSubmit = () => {
    history.push({
      pathname: "/dashboard/search",
      search: `?q=${searchValue}`,
      state: { search },
    });

    setModalResult(false);
    setSearchValue("");
  };

  useEffect(() => {
    if (debounceSearchValue) {
      searchFile(debounceSearchValue);
      setModalResult(true);
    } else {
      setModalResult(false);
    }
  }, [debounceSearchValue]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu, then close the menu
      if (
        modalResult &&
        resultRef.current &&
        !resultRef.current.contains(e.target)
      ) {
        setModalResult(false);
      }

      if (
        isOpen &&
        accountRef.current &&
        !accountRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [modalResult, isOpen]);

  return (
    <div className="home-search-logout">
      <div className="col l-2">
        <div className="home">
          <a href="/">
            <svg
              width="96px"
              height="96px"
              viewBox="0 0 94 94"
              fill="none"
              focusable="false"
            >
              <path
                d="M10.7219 73.2906L14.4917 79.8021C15.275 81.1729 16.401 82.25 17.7229 83.0333L31.1865 59.7292H4.25937C4.25937 61.2469 4.65104 62.7646 5.43437 64.1354L10.7219 73.2906Z"
                fill="#0066DA"
              ></path>
              <path
                d="M47 32.3125L33.5365 9.00833C32.2146 9.79166 31.0885 10.8687 30.3052 12.2396L5.43437 55.3229C4.65104 56.6938 4.25937 58.2115 4.25937 59.7292H31.1865L47 32.3125Z"
                fill="#00AC47"
              ></path>
              <path
                d="M47 32.3125L60.4635 9.00833C59.1416 8.22499 57.6239 7.83333 56.0573 7.83333H37.9427C36.376 7.83333 34.8583 8.27395 33.5364 9.00833L47 32.3125Z"
                fill="#00832D"
              ></path>
              <path
                d="M62.8135 59.7292H31.1864L17.7229 83.0333C19.0448 83.8167 20.5625 84.2083 22.1292 84.2083H71.8708C73.4375 84.2083 74.9552 83.7677 76.2771 83.0333L62.8135 59.7292Z"
                fill="#2684FC"
              ></path>
              <path
                d="M76.2771 83.0333C77.599 82.25 78.725 81.1729 79.5083 79.8021L81.075 77.1094L88.5656 64.1354C89.3489 62.7646 89.7406 61.2469 89.7406 59.7292H62.8625L76.2771 83.0333Z"
                fill="#EA4335"
              ></path>
              <path
                d="M76.1302 33.7813L63.6948 12.2396C62.9115 10.8687 61.7854 9.79166 60.4635 9.00833L47 32.3125L62.8135 59.7292H89.6917C89.6917 58.2115 89.3 56.6938 88.5167 55.3229L76.1302 33.7813Z"
                fill="#FFBA00"
              ></path>
            </svg>
            <span>Drive</span>
          </a>
        </div>
      </div>
      <div className="col l-7">
        <form onSubmit={handleSubmit}>
          <div className="search">
            <i className="fa fa-search" aria-hidden="true"></i>
            <input
              type="text"
              placeholder="Search in drive"
              className="search-input"
              name="q"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              autoComplete="off"
            />

            {/* Modal Search */}
            {modalResult && (
              <div ref={resultRef} className="show-result-modal">
                <ModalResult />
              </div>
            )}
          </div>
        </form>
      </div>
      <div className="logout col l-3">
        <button onClick={() => setIsOpen(!isOpen)} className="logout-btn">
          <i className="fa fa-user-circle" aria-hidden="true"></i>
          <div className="logout-info">
            <p>Account</p>
            <p>{username}</p>
          </div>
        </button>
        {isOpen && <Dropdown accountRef={accountRef} />}
      </div>
    </div>
  );
}

export default HomeSearchLogOut;
