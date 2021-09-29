import image from "../images/image.png";
import pdf from "../images/pdf.png";
import txt from "../images/text.png";
import docx from "../images/word.png";
import pptx from "../images/powerpoint.png";
import xlsx from "../images/excel.png";

// export const apiUrl = "http://localhost:4000/api";

export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:4000/api"
    : "https://pacific-island-43834.herokuapp.com/api";

export const LOCAL_STORAGE_TOKEN_NAME = "mern_project";
export const SET_AUTH = "SET_AUTH";
export const RETURN_LOGIN = "RETURN_LOGIN";
export const GET_USERS_LOGINED = "GET_USERS_LOGINED";
export const IMAGE_TYPE = image;
export const PDF_TYPE = pdf;
export const TEXT_TYPE = txt;
export const DOCX_TYPE = docx;
export const PPTX_TYPE = pptx;
export const XLSX_TYPE = xlsx;
export const UPLOAD = "UPLOAD";
export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";
export const POSTS_LOADED_FAILURE = "POSTS_LOADED_FAILURE";
export const POSTS_DRAG_DROP = "POSTS_DRAG_DROP";
export const POSTS_CHANGE_COLOR = "POSTS_CHANGE_COLOR";
export const OPEN_MODAL_UPLOAD = "OPEN_MODAL_UPLOAD";
export const CLOSE_MODAL_UPLOAD = "CLOSE_MODAL_UPLOAD";
export const GET_DELETED_POSTS_SUCCESS = "GET_DELETED_POSTS_SUCCESS";
export const GET_DELETED_POSTS_FAILURE = "GET_DELETED_POSTS_FAILURE";
export const DELETED_POSTS_CHANGE_COLOR = "DELETED_POSTS_CHANGE_COLOR";
export const GET_STARRED_POSTS_SUCCESS = "GET_STARRED_POSTS_SUCCESS";
export const GET_STARRED_POSTS_FAILURE = "GET_STARRED_POSTS_FAILURE";
export const STARRED_POSTS_CHANGE_COLOR = "STARRED_POSTS_CHANGE_COLOR";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAILURE = "SEARCH_FAILURE";
export const SEARCH_CHANGE_COLOR = "SEARCH_CHANGE_COLOR";
export const GET_FOLDERS_SUCCESS = "GET_FOLDERS_SUCCESS";
export const GET_FOLDERS_FAILURE = "GET_FOLDERS_FAILURE";
export const FOLDERS_CHANGE_COLOR = "FOLDERS_CHANGE_COLOR";
export const GET_DELETED_FOLDERS_SUCCESS = "GET_DELETED_FOLDERS_SUCCESS";
export const GET_DELETED_FOLDERS_FAILURE = "GET_DELETED_FOLDERS_FAILURE";
export const DELETED_FOLDERS_CHANGE_COLOR = "DELETED_FOLDERS_CHANGE_COLOR";
export const GET_STARRED_FOLDERS_SUCCESS = "GET_STARRED_FOLDERS_SUCCESS";
export const GET_STARRED_FOLDERS_FAILURE = "GET_STARRED_FOLDERS_FAILURE";
export const STARRED_FOLDERS_CHANGE_COLOR = "STARRED_FOLDERS_CHANGE_COLOR";
export const GET_INSIDE_FOLDERS_POSTS_LOADED_SUCCESS =
  "GET_INSIDE_FOLDERS_POSTS_LOADED_SUCCESS";
export const GET_INSIDE_FOLDERS_POSTS_LOADED_FAILURE =
  "GET_INSIDE_FOLDERS_POSTS_LOADED_FAILURE";
export const GET_INSIDE_FOLDERS_FOLDERS_LOADED_SUCCESS =
  "GET_INSIDE_FOLDERS_FOLDERS_LOADED_SUCCESS";
export const GET_INSIDE_FOLDERS_FOLDERS_LOADED_FAILURE =
  "GET_INSIDE_FOLDERS_FOLDERS_LOADED_FAILURE";
export const INSIDEFOLDERS_UPLOAD = "INSIDEFOLDERS_UPLOAD";
export const OPEN_MODAL_UPLOAD_INSIDE = "OPEN_MODAL_UPLOAD_INSIDE";
export const CLOSE_MODAL_UPLOAD_INSIDE = "CLOSE_MODAL_UPLOAD_INSIDE";
export const INSIDEFOLDERS_POSTS_CHANGE_COLOR =
  "INSIDEFOLDERS_POSTS_CHANGE_COLOR";
export const GET_DELETED_INSIDE_FOLDERS_POSTS_SUCCESS =
  "GET_DELETED_INSIDE_FOLDERS_POSTS_SUCCESS";
export const GET_DELETED_INSIDE_FOLDERS_POSTS_FAILURE =
  "GET_DELETED_INSIDE_FOLDERS_POSTS_FAILURE";
export const DELETED_INSIDE_FOLDERS_POSTS_CHANGE_COLOR =
  "DELETED_INSIDE_FOLDERS_POSTS_CHANGE_COLOR";
export const GET_STARRED_INSIDE_FOLDERS_POSTS_SUCCESS =
  "GET_STARRED_INSIDE_FOLDERS_POSTS_SUCCESS";
export const GET_STARRED_INSIDE_FOLDERS_POSTS_FAILURE =
  "GET_STARRED_INSIDE_FOLDERS_POSTS_FAILURE";
export const STARRED_INSIDE_FOLDERS_POSTS_CHANGE_COLOR =
  "STARRED_INSIDE_FOLDERS_POSTS_CHANGE_COLOR";

export const INSIDEFOLDERS_FOLDERS_CHANGE_COLOR =
  "INSIDEFOLDERS_FOLDERS_CHANGE_COLOR";
export const GET_DELETED_INSIDE_FOLDERS_FOLDERS_SUCCESS =
  "GET_DELETED_INSIDE_FOLDERS_FOLDERS_SUCCESS";
export const GET_DELETED_INSIDE_FOLDERS_FOLDERS_FAILURE =
  "GET_DELETED_INSIDE_FOLDERS_FOLDERS_FAILURE";
export const DELETED_INSIDE_FOLDERS_FOLDERS_CHANGE_COLOR =
  "DELETED_INSIDE_FOLDERS_FOLDERS_CHANGE_COLOR";
export const GET_STARRED_INSIDE_FOLDERS_FOLDERS_SUCCESS =
  "GET_STARRED_INSIDE_FOLDERS_FOLDERS_SUCCESS";
export const GET_STARRED_INSIDE_FOLDERS_FOLDERS_FAILURE =
  "GET_STARRED_INSIDE_FOLDERS_FOLDERS_FAILURE";
export const STARRED_INSIDE_FOLDERS_FOLDERS_CHANGE_COLOR =
  "STARRED_INSIDE_FOLDERS_FOLDERS_CHANGE_COLOR";
