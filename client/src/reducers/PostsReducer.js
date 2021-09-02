import {
  UPLOAD,
  POSTS_LOADED_FAILURE,
  POSTS_LOADED_SUCCESS,
  POSTS_CHANGE_COLOR,
  OPEN_MODAL_UPLOAD,
  CLOSE_MODAL_UPLOAD,
  GET_DELETED_POSTS_SUCCESS,
  GET_DELETED_POSTS_FAILURE,
  DELETED_POSTS_CHANGE_COLOR,
  STARRED_POSTS_CHANGE_COLOR,
  GET_STARRED_POSTS_SUCCESS,
  GET_STARRED_POSTS_FAILURE,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SEARCH_CHANGE_COLOR,
  FOLDERS_CHANGE_COLOR,
  GET_DELETED_FOLDERS_SUCCESS,
  GET_DELETED_FOLDERS_FAILURE,
  GET_FOLDERS_FAILURE,
  GET_FOLDERS_SUCCESS,
  DELETED_FOLDERS_CHANGE_COLOR,
  GET_STARRED_FOLDERS_SUCCESS,
  GET_STARRED_FOLDERS_FAILURE,
  STARRED_FOLDERS_CHANGE_COLOR,
  GET_INSIDE_FOLDERS_POSTS_LOADED_SUCCESS,
  GET_INSIDE_FOLDERS_POSTS_LOADED_FAILURE,
  INSIDEFOLDERS_UPLOAD,
  CLOSE_MODAL_UPLOAD_INSIDE,
  OPEN_MODAL_UPLOAD_INSIDE,
  GET_DELETED_INSIDE_FOLDERS_POSTS_FAILURE,
  GET_DELETED_INSIDE_FOLDERS_POSTS_SUCCESS,
  DELETED_INSIDE_FOLDERS_POSTS_CHANGE_COLOR,
  STARRED_INSIDE_FOLDERS_POSTS_CHANGE_COLOR,
  GET_STARRED_INSIDE_FOLDERS_POSTS_SUCCESS,
  GET_STARRED_INSIDE_FOLDERS_POSTS_FAILURE,
  GET_INSIDE_FOLDERS_FOLDERS_LOADED_SUCCESS,
  GET_INSIDE_FOLDERS_FOLDERS_LOADED_FAILURE,
  INSIDEFOLDERS_FOLDERS_CHANGE_COLOR,
  GET_DELETED_INSIDE_FOLDERS_FOLDERS_FAILURE,
  GET_DELETED_INSIDE_FOLDERS_FOLDERS_SUCCESS,
  DELETED_INSIDE_FOLDERS_FOLDERS_CHANGE_COLOR,
  GET_STARRED_INSIDE_FOLDERS_FOLDERS_FAILURE,
  GET_STARRED_INSIDE_FOLDERS_FOLDERS_SUCCESS,
  STARRED_INSIDE_FOLDERS_FOLDERS_CHANGE_COLOR,
} from "../contexts/constants";

const postsReducer = (state, action) => {
  switch (action.type) {
    // POSTS
    case POSTS_LOADED_SUCCESS:
      return {
        ...state,
        postsLoading: action.payload.postsLoading,
        posts: action.payload.posts,
      };
    case POSTS_LOADED_FAILURE:
      return {
        ...state,
        postsLoading: action.payload.postsLoading,
        posts: action.payload.posts,
      };
    case POSTS_CHANGE_COLOR:
      return { ...state, posts: action.payload.posts };
    case UPLOAD:
      return {
        ...state,
        uploadPosts: [...state.uploadPosts, action.payload.uploadPosts],
      };
    case OPEN_MODAL_UPLOAD:
      return {
        ...state,
        uploadPosts: [...state.uploadPosts, action.payload.uploadPosts],
      };
    case CLOSE_MODAL_UPLOAD:
      return { ...state, uploadPosts: action.payload.uploadPosts };
    case GET_DELETED_POSTS_SUCCESS:
      return {
        ...state,
        deletedPostsLoading: action.payload.deletedPostsLoading,
        deletedPosts: action.payload.deletedPosts,
      };
    case GET_DELETED_POSTS_FAILURE:
      return {
        ...state,
        deletedPostsLoading: action.payload.deletedPostsLoading,
        deletedPosts: action.payload.deletedPosts,
      };
    case DELETED_POSTS_CHANGE_COLOR:
      return { ...state, deletedPosts: action.payload.deletedPosts };
    case STARRED_POSTS_CHANGE_COLOR:
      return { ...state, starredPosts: action.payload.starredPosts };
    case GET_STARRED_POSTS_SUCCESS:
      return {
        ...state,
        starredPostsLoading: action.payload.starredPostsLoading,
        starredPosts: action.payload.starredPosts,
      };
    case GET_STARRED_POSTS_FAILURE:
      return {
        ...state,
        starredPostsLoading: action.payload.starredPostsLoading,
        starredPosts: action.payload.starredPosts,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        searchLoading: action.payload.searchLoading,
        search: action.payload.search,
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        searchLoading: action.payload.searchLoading,
        search: action.payload.search,
      };
    case SEARCH_CHANGE_COLOR:
      return { ...state, search: action.payload.search };

    // --------------------------------------------------
    // FOLDERS
    case GET_FOLDERS_SUCCESS:
      return {
        ...state,
        foldersLoading: action.payload.foldersLoading,
        folders: action.payload.folders,
      };
    case GET_FOLDERS_FAILURE:
      return {
        ...state,
        foldersLoading: action.payload.foldersLoading,
        folders: action.payload.folders,
      };
    case FOLDERS_CHANGE_COLOR:
      return { ...state, folders: action.payload.folders };
    case GET_DELETED_FOLDERS_SUCCESS:
      return {
        ...state,
        deletedFoldersLoading: action.payload.deletedFoldersLoading,
        deletedFolders: action.payload.deletedFolders,
      };
    case GET_DELETED_FOLDERS_FAILURE:
      return {
        ...state,
        deletedFoldersLoading: action.payload.deletedFoldersLoading,
        deletedFolders: action.payload.deletedFolders,
      };
    case DELETED_FOLDERS_CHANGE_COLOR:
      return { ...state, deletedFolders: action.payload.deletedFolders };
    case GET_STARRED_FOLDERS_SUCCESS:
      return {
        ...state,
        starredFoldersLoading: action.payload.starredFoldersLoading,
        starredFolders: action.payload.starredFolders,
      };
    case GET_STARRED_FOLDERS_FAILURE:
      return {
        ...state,
        starredFoldersLoading: action.payload.starredFoldersLoading,
        starredFolders: action.payload.starredFolders,
      };
    case STARRED_FOLDERS_CHANGE_COLOR:
      return { ...state, starredFolders: action.payload.starredFolders };

    // -------------------------------------------------
    // INSIDE FOLDERS - POSTS
    case GET_INSIDE_FOLDERS_POSTS_LOADED_SUCCESS:
      return {
        ...state,
        insideFoldersPostsLoading: action.payload.insideFoldersPostsLoading,
        insideFolders_Posts: action.payload.insideFolders_Posts,
      };
    case GET_INSIDE_FOLDERS_POSTS_LOADED_FAILURE:
      return {
        ...state,
        insideFoldersPostsLoading: action.payload.insideFoldersPostsLoading,
        insideFolders_Posts: action.payload.insideFolders_Posts,
      };
    case INSIDEFOLDERS_UPLOAD:
      return {
        ...state,
        insideFolders_UploadPosts: [
          ...state.insideFolders_UploadPosts,
          action.payload.insideFolders_UploadPosts,
        ],
      };
    case OPEN_MODAL_UPLOAD_INSIDE:
      return {
        ...state,
        insideFolders_UploadPosts: [
          ...state.insideFolders_UploadPosts,
          action.payload.insideFolders_UploadPosts,
        ],
      };
    case CLOSE_MODAL_UPLOAD_INSIDE:
      return {
        ...state,
        insideFolders_UploadPosts: action.payload.insideFolders_UploadPosts,
      };
    case GET_DELETED_INSIDE_FOLDERS_POSTS_SUCCESS:
      return {
        ...state,
        deletedInsideFPsLoading: action.payload.deletedInsideFPsLoading,
        deletedInsideFPs: action.payload.deletedInsideFPs,
      };
    case GET_DELETED_INSIDE_FOLDERS_POSTS_FAILURE:
      return {
        ...state,
        deletedInsideFPsLoading: action.payload.deletedInsideFPsLoading,
        deletedInsideFPs: action.payload.deletedInsideFPs,
      };
    case DELETED_INSIDE_FOLDERS_POSTS_CHANGE_COLOR:
      return { ...state, deletedInsideFPs: action.payload.deletedInsideFPs };
    case STARRED_INSIDE_FOLDERS_POSTS_CHANGE_COLOR:
      return { ...state, starredInsideFPs: action.payload.starredInsideFPs };
    case GET_STARRED_INSIDE_FOLDERS_POSTS_SUCCESS:
      return {
        ...state,
        starredInsideFPsLoading: action.payload.starredInsideFPsLoading,
        starredInsideFPs: action.payload.starredInsideFPs,
      };
    case GET_STARRED_INSIDE_FOLDERS_POSTS_FAILURE:
      return {
        ...state,
        starredInsideFPsLoading: action.payload.starredInsideFPsLoading,
        starredInsideFPs: action.payload.starredInsideFPs,
      };

    // -------------------------------------------------
    // INSIDE FOLDERS - FOLDERS
    case GET_INSIDE_FOLDERS_FOLDERS_LOADED_SUCCESS:
      return {
        ...state,
        insideFoldersFoldersLoading: action.payload.insideFoldersFoldersLoading,
        insideFolders_Folders: action.payload.insideFolders_Folders,
      };
    case GET_INSIDE_FOLDERS_FOLDERS_LOADED_FAILURE:
      return {
        ...state,
        insideFoldersFoldersLoading: action.payload.insideFoldersFoldersLoading,
        insideFolders_Folders: action.payload.insideFolders_Folders,
      };
    case INSIDEFOLDERS_FOLDERS_CHANGE_COLOR:
      return {
        ...state,
        insideFolders_Folders: action.payload.insideFolders_Folders,
      };
    case GET_DELETED_INSIDE_FOLDERS_FOLDERS_SUCCESS:
      return {
        ...state,
        deletedInsideFFsLoading: action.payload.deletedInsideFFsLoading,
        deletedInsideFFs: action.payload.deletedInsideFFs,
      };
    case GET_DELETED_INSIDE_FOLDERS_FOLDERS_FAILURE:
      return {
        ...state,
        deletedInsideFFsLoading: action.payload.deletedInsideFFsLoading,
        deletedInsideFFs: action.payload.deletedInsideFFs,
      };
    case DELETED_INSIDE_FOLDERS_FOLDERS_CHANGE_COLOR:
      return { ...state, deletedInsideFFs: action.payload.deletedInsideFFs };
    case GET_STARRED_INSIDE_FOLDERS_FOLDERS_SUCCESS:
      return {
        ...state,
        starredInsideFFsLoading: action.payload.starredInsideFFsLoading,
        starredInsideFFs: action.payload.starredInsideFFs,
      };
    case GET_STARRED_INSIDE_FOLDERS_FOLDERS_FAILURE:
      return {
        ...state,
        starredInsideFFsLoading: action.payload.starredInsideFFsLoading,
        starredInsideFFs: action.payload.starredInsideFFs,
      };
    case STARRED_INSIDE_FOLDERS_FOLDERS_CHANGE_COLOR:
      return { ...state, starredInsideFFs: action.payload.starredInsideFFs };

    default:
      return state;
  }
};

export default postsReducer;
