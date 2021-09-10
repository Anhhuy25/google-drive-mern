import React, { useState, useContext, useReducer, useCallback } from "react";
import axios from "axios";
import postsReducer from "../reducers/PostsReducer";
import {
  apiUrl,
  POSTS_LOADED_SUCCESS,
  POSTS_LOADED_FAILURE,
  GET_DELETED_POSTS_SUCCESS,
  GET_DELETED_POSTS_FAILURE,
  GET_STARRED_POSTS_SUCCESS,
  GET_STARRED_POSTS_FAILURE,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  GET_DELETED_FOLDERS_FAILURE,
  GET_DELETED_FOLDERS_SUCCESS,
  GET_FOLDERS_FAILURE,
  GET_FOLDERS_SUCCESS,
  GET_STARRED_FOLDERS_FAILURE,
  GET_STARRED_FOLDERS_SUCCESS,
  GET_INSIDE_FOLDERS_POSTS_LOADED_SUCCESS,
  GET_DELETED_INSIDE_FOLDERS_POSTS_SUCCESS,
  GET_INSIDE_FOLDERS_POSTS_LOADED_FAILURE,
  GET_STARRED_INSIDE_FOLDERS_POSTS_SUCCESS,
  GET_STARRED_INSIDE_FOLDERS_POSTS_FAILURE,
  GET_INSIDE_FOLDERS_FOLDERS_LOADED_SUCCESS,
  GET_INSIDE_FOLDERS_FOLDERS_LOADED_FAILURE,
  GET_DELETED_INSIDE_FOLDERS_FOLDERS_SUCCESS,
  GET_STARRED_INSIDE_FOLDERS_FOLDERS_FAILURE,
  GET_STARRED_INSIDE_FOLDERS_FOLDERS_SUCCESS,
  GET_DELETED_INSIDE_FOLDERS_FOLDERS_FAILURE,
} from "./constants";

const PostsContext = React.createContext();

const PostsProvider = ({ children }) => {
  const [postsState, dispatch] = useReducer(postsReducer, {
    // Posts
    postsLoading: true,
    deletedPostsLoading: true,
    starredPostsLoading: true,
    searchLoading: true,
    posts: [],
    uploadPosts: [],
    deletedPosts: [],
    starredPosts: [],
    searchPosts: [],
    search: [],
    // Folders
    foldersLoading: true,
    deletedFoldersLoading: true,
    starredFoldersLoading: true,
    folders: [],
    deletedFolders: [],
    starredFolders: [],
    // Inside folder
    insideFoldersPostsLoading: true,
    deletedInsideFPsLoading: true,
    starredInsideFPsLoading: true,
    insideFoldersFoldersLoading: true,
    deletedInsideFFsLoading: true,
    starredInsideFFsLoading: true,
    insideFolders_UploadPosts: [],
    insideFolders_Posts: [],
    insideFolders_Folders: [],
    deletedInsideFPs: [],
    deletedInsideFFs: [],
    starredInsideFPs: [],
    starredInsideFFs: [],
  });
  // Posts
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selected, setSelected] = useState([]);
  const [dragDropFile, setDragDropFile] = useState(null);
  const [info, setInfo] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [showIconNavbarPost, setShowIconNavbarPost] = useState(false);
  const [showIconNavbarTrashPost, setShowIconNavbarTrashPost] = useState(false);
  const [showIconNavbarStarredPost, setShowIconNavbarStarredPost] =
    useState(false);
  const [showIconNavbarSearchPost, setShowIconNavbarSearchPost] =
    useState(false);
  const [modalRename, setModalRename] = useState(false);
  const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
  const [modalUndo, setModalUndo] = useState(false);
  const [modalUndone, setModalUndone] = useState(false);
  const [modalRestore, setModalRestore] = useState(false);
  const [modalAddStarr, setModalAddStarr] = useState(false);
  const [modalSepaOrUpda, setModalSepaOrUpda] = useState(false);
  const [uploadRes, setUploadRes] = useState(null);
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isPost, setIsPost] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [navValue, setNavValue] = useState("My Drive");

  // Folders
  const [modalCreateFolder, setModalCreateFolder] = useState(false);
  const [valueModalCreate, setValueModalCreate] = useState("Untitled folder");
  const [isInTrash, setIsInTrash] = useState(false);

  // Inside folders
  const [insideDADFile, setInsideDADFile] = useState(null);
  const [showModalUploadInside, setShowModalUploadInside] = useState(false);
  const [showModalInside, setShowModalInside] = useState(false);
  const [isInsideFP, setIsInsideFP] = useState(false);

  // POSTS
  const progressBarChange = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      // const percentage = parseInt(Math.round((loaded * 100) / total));
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setProgressUpload(percentage);
    },
  };

  // Get all posts
  const getAllPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts/my-posts`);
      if (response.data.success) {
        dispatch({
          type: POSTS_LOADED_SUCCESS,
          payload: {
            postsLoading: false,
            posts: response.data.posts,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: POSTS_LOADED_FAILURE,
        payload: { postsLoading: false, posts: [] },
      });
    }
  };

  // Post file
  const onFileUpload = useCallback(async () => {
    const formData = new FormData();

    try {
      if (selectedFile) {
        formData.append("myFile", selectedFile);
        const response = await axios.post(
          `${apiUrl}/posts/create-post`,
          formData,
          progressBarChange
        );
        if (response.data.msg === "Do you want to separate post?") {
          setModalSepaOrUpda(true);
          setIsPost(true);
          setUploadRes(response.data);
        } else {
          await getAllPosts();
        }
        // await getAllPosts();
      }
    } catch (error) {
      console.log(error);
    }
    setSelectedFile(null);
    // eslint-disable-next-line
  }, [selectedFile]);

  // Keep separate file
  const keepSeparateFile = async () => {
    const separateFile = postsState.posts.find(
      (post) => post.fileName === uploadRes.name
    );

    try {
      await axios.post(
        `${apiUrl}/posts/separate-post`,
        { separateFile },
        progressBarChange
      );
      await getAllPosts();
    } catch (error) {
      console.log(error);
    }
  };

  // Drag and drop file
  const onFileDragDrop = useCallback(async () => {
    const formData = new FormData();

    if (dragDropFile) {
      formData.append("myFile", dragDropFile);
      await axios.post(
        `${apiUrl}/posts/create-post`,
        formData,
        progressBarChange
      );
      await getAllPosts();
    }
    setDragDropFile(null);
    // eslint-disable-next-line
  }, [dragDropFile]);

  // Search file
  const searchFile = async (query) => {
    try {
      const response = await axios.post(`${apiUrl}/posts/search`, { query });
      if (response.data.success) {
        dispatch({
          type: SEARCH_SUCCESS,
          payload: {
            searchLoading: false,
            search: [...response.data.posts, ...response.data.folders],
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: SEARCH_FAILURE,
        payload: { searchLoading: false, search: [] },
      });
    }
  };

  // Update file
  const updatePost = async (file, name) => {
    file.fileName = name;
    try {
      await axios.put(`${apiUrl}/posts/${file._id}`, { file });
      await getAllPosts();
    } catch (error) {
      console.log(error);
    }
  };

  // Soft delete file
  const softDeletePost = async (id) => {
    try {
      await axios.delete(`${apiUrl}/posts/${id}`);
      await getAllPosts();
      await getDeletedPosts();
      await getStarredPosts();
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setModalUndo(false);
    }, 5000);
    setTimeout(() => {
      setModalUndone(false);
    }, 3000);
  };

  // Get all deleted posts
  const getDeletedPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts/my-trash`);
      if (response.data.success) {
        dispatch({
          type: GET_DELETED_POSTS_SUCCESS,
          payload: {
            deletedPostsLoading: false,
            deletedPosts: response.data.deletedPosts,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_DELETED_POSTS_FAILURE,
        payload: { deletedPostsLoading: false, deletedPosts: [] },
      });
    }
  };

  // Delete post
  const deletePost = async (id) => {
    try {
      await axios.delete(`${apiUrl}/posts/my-trash/${id}`);
      await getDeletedPosts();
    } catch (error) {
      console.log(error);
    }
  };

  // Restore post
  const restorePost = async (id) => {
    try {
      await axios.post(`${apiUrl}/posts/my-trash/restore/${id}`);
      await getAllPosts();
      await getDeletedPosts();
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setModalRestore(false);
    }, 5000);
  };

  // Get all starred posts
  const getStarredPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts/my-starr`);
      if (response.data.success) {
        dispatch({
          type: GET_STARRED_POSTS_SUCCESS,
          payload: {
            starredPostsLoading: false,
            starredPosts: response.data.starredPosts,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_STARRED_POSTS_FAILURE,
        payload: { starredPostsLoading: false, starredPosts: [] },
      });
    }
  };

  // Add starred post
  const addStarredPosts = async (info) => {
    try {
      await axios.patch(`${apiUrl}/posts/my-starr/${info._id}`);
      await getStarredPosts();
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setModalAddStarr(false);
    }, 5000);
  };

  // Remove starred posts
  const removeStarredPosts = async (info) => {
    try {
      await axios.patch(`${apiUrl}/posts/remove-starr/${info._id}`);
      await getStarredPosts();
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setModalAddStarr(false);
    }, 5000);
    setTimeout(() => {
      setModalUndone(false);
    }, 3000);
  };

  //-----------------------------------------------------------
  // FOLDERS
  // Get all folders
  const getAllFolders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/folders`);
      if (response.data.success) {
        dispatch({
          type: GET_FOLDERS_SUCCESS,
          payload: { foldersLoading: false, folders: response.data.folders },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_FOLDERS_FAILURE,
        payload: { foldersLoading: false, folders: [] },
      });
    }
  };

  // Create folder
  const createFolder = async (name) => {
    try {
      await axios.post(`${apiUrl}/folders/create-folder`, { name });
      await getAllFolders();
    } catch (error) {
      console.log(error);
    }
  };

  // Update folder
  const updateFolder = async (folder, name) => {
    folder.folderName = name;
    try {
      await axios.put(`${apiUrl}/folders/update-folder/${folder._id}`, {
        folder,
      });
      await getAllFolders();
    } catch (error) {
      console.log(error);
    }
  };

  // Get deleted folder
  const getDeletedFolders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/folders/trash-folders`);

      if (response.data.success) {
        dispatch({
          type: GET_DELETED_FOLDERS_SUCCESS,
          payload: {
            deletedFoldersLoading: false,
            deletedFolders: response.data.deletedFolders,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_DELETED_FOLDERS_FAILURE,
        payload: { deletedFoldersLoading: false, deletedFolders: [] },
      });
    }
  };

  // Soft delete folder
  const softDeleteFolder = async (id) => {
    try {
      await axios.delete(`${apiUrl}/folders/softdelete-folder/${id}`);
      await getAllFolders();
      await getDeletedFolders();
      await getStarredFolders();
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setModalUndo(false);
    }, 5000);
    setTimeout(() => {
      setModalUndone(false);
    }, 3000);
  };

  // Real delete folder
  const deleteFolder = async (id) => {
    try {
      await axios.delete(`${apiUrl}/folders/trash-folders/${id}`);
      await getDeletedFolders();
    } catch (error) {
      console.log(error);
    }
  };

  // Restore deleted folders
  const restoreFolder = async (id) => {
    try {
      await axios.post(`${apiUrl}/folders/trash-folders/restore/${id}`);
      await getAllFolders();
      await getDeletedFolders();
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setModalRestore(false);
    }, 5000);
  };

  // Get all starred folders
  const getStarredFolders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/folders/starr-folders`);
      if (response.data.success) {
        dispatch({
          type: GET_STARRED_FOLDERS_SUCCESS,
          payload: {
            starredFoldersLoading: false,
            starredFolders: response.data.starredFolders,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_STARRED_FOLDERS_FAILURE,
        payload: { starredFoldersLoading: false, starredFolders: [] },
      });
    }
  };

  // Add starred folder
  const addStarredFolders = async (info) => {
    try {
      await axios.patch(`${apiUrl}/folders/starr-folders/${info._id}`);
      await getStarredFolders();
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setModalAddStarr(false);
    }, 5000);
  };

  // Remove starred folders
  const removeStarredFolders = async (info) => {
    try {
      await axios.patch(`${apiUrl}/folders/remove-starr-folders/${info._id}`);
      await getStarredFolders();
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setModalAddStarr(false);
    }, 5000);
    setTimeout(() => {
      setModalUndone(false);
    }, 3000);
  };

  //--------------------------------------------
  // INSIDE FOLDERS - POSTS
  // Get all posts
  const getInsideFoldersAllPosts = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/insidefoldersposts/insidefolders-myposts`
      );
      if (response.data.success) {
        dispatch({
          type: GET_INSIDE_FOLDERS_POSTS_LOADED_SUCCESS,
          payload: {
            insideFoldersPostsLoading: false,
            insideFolders_Posts: response.data.insideFolders_Posts,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: POSTS_LOADED_FAILURE,
        payload: { insideFoldersPostsLoading: false, insideFolders_Posts: [] },
      });
    }
  };

  // Post file
  const onFileUploadInsideFolders = useCallback(
    async (id) => {
      const formData = new FormData();

      try {
        if (selectedFile) {
          formData.append("myFileInside", selectedFile);
          formData.append("folderId", id);
          const response = await axios.post(
            `${apiUrl}/insidefoldersposts/insidefolders-myposts/create-post`,
            formData,
            progressBarChange
          );
          if (response.data.msg === "Post has in folder") {
            setModalSepaOrUpda(true);
            setIsInsideFP(true);
            setUploadRes(response.data);
          } else {
            await getInsideFoldersAllPosts();
          }
        }
      } catch (error) {
        console.log(error);
      }
      setSelectedFile(null);
    },
    // eslint-disable-next-line
    [selectedFile]
  );

  // Keep separate file
  const keepSeparateFileInsideFolders = async (id) => {
    const separateFile = postsState.insideFolders_Posts.find(
      (post) => post.fileName === uploadRes.name
    );

    try {
      await axios.post(
        `${apiUrl}/insidefoldersposts/insidefolders-myposts/separate-post`,
        { separateFile, id },
        progressBarChange
      );
      await getInsideFoldersAllPosts();
    } catch (error) {
      console.log(error);
    }
  };

  // Drag and drop file
  const onFileDDInsideFolders = useCallback(async () => {
    const formData = new FormData();

    if (insideDADFile) {
      formData.append("myFileInside", insideDADFile);
      await axios.post(
        `${apiUrl}/insidefoldersposts/insidefolders-myposts/create-post`,
        formData,
        progressBarChange
      );
      await getInsideFoldersAllPosts();
    }
    setInsideDADFile(null);
    // eslint-disable-next-line
  }, [insideDADFile]);

  // Update file
  const updateInsideFoldersPosts = async (file, name) => {
    file.fileName = name;
    try {
      await axios.put(
        `${apiUrl}/insidefoldersposts/insidefolders-myposts/update-post/${file._id}`,
        { file }
      );
      await getAllPosts();
    } catch (error) {
      console.log(error);
    }
  };

  // Soft delete file
  const softDeleteInsideFPs = async (id) => {
    try {
      await axios.delete(
        `${apiUrl}/insidefoldersposts/insidefolders-myposts/remove-post/${id}`
      );
      await getInsideFoldersAllPosts();
      await getDeletedInsideFPs();
      await getStarredInsideFPs();
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setModalUndo(false);
    }, 5000);
    setTimeout(() => {
      setModalUndone(false);
    }, 3000);
  };

  // Get all deleted posts
  const getDeletedInsideFPs = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/insidefoldersposts/insidefolders-myposts/my-trash`
      );
      if (response.data.success) {
        dispatch({
          type: GET_DELETED_INSIDE_FOLDERS_POSTS_SUCCESS,
          payload: {
            deletedInsideFPsLoading: false,
            deletedInsideFPs: response.data.deletedInsideFPs,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_INSIDE_FOLDERS_POSTS_LOADED_FAILURE,
        payload: { deletedInsideFPsLoading: false, deletedInsideFPs: [] },
      });
    }
  };

  // Delete post
  const deleteInsideFoldersPost = async (id) => {
    try {
      await axios.delete(
        `${apiUrl}/insidefoldersposts/insidefolders-myposts/my-trash/${id}`
      );
      await getDeletedInsideFPs();
    } catch (error) {
      console.log(error);
    }
  };

  // Restore post
  const restoreInsideFoldersPost = async (id) => {
    try {
      await axios.post(
        `${apiUrl}/insidefoldersposts/insidefolders-myposts/my-trash/restore/${id}`
      );
      await getInsideFoldersAllPosts();
      await getDeletedInsideFPs();
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setModalRestore(false);
    }, 5000);
  };

  // Get all starred posts
  const getStarredInsideFPs = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/insidefoldersposts/insidefolders-myposts/my-starr`
      );
      if (response.data.success) {
        dispatch({
          type: GET_STARRED_INSIDE_FOLDERS_POSTS_SUCCESS,
          payload: {
            starredInsideFPsLoading: false,
            starredInsideFPs: response.data.starredInsideFPs,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_STARRED_INSIDE_FOLDERS_POSTS_FAILURE,
        payload: { starredInsideFPsLoading: false, starredInsideFPs: [] },
      });
    }
  };

  // Add starred post
  const addStarredInsideFPs = async (info) => {
    try {
      await axios.patch(
        `${apiUrl}/insidefoldersposts/insidefolders-myposts/my-starr/${info._id}`
      );
      await getStarredInsideFPs();
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setModalAddStarr(false);
    }, 5000);
  };

  // Remove starred posts
  const removeStarredInsideFPs = async (info) => {
    try {
      await axios.patch(
        `${apiUrl}/insidefoldersposts/insidefolders-myposts/remove-starr/${info._id}`
      );
      await getStarredInsideFPs();
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setModalAddStarr(false);
    }, 5000);
    setTimeout(() => {
      setModalUndone(false);
    }, 3000);
  };

  //-----------------------------------------------------------
  // INSIDE FOLDERS - FOLDERS
  // Get all folders
  const getInsideFoldersAllFolders = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/insidefoldersfolders/insidefolders-myfolders`
      );
      if (response.data.success) {
        dispatch({
          type: GET_INSIDE_FOLDERS_FOLDERS_LOADED_SUCCESS,
          payload: {
            insideFoldersFoldersLoading: false,
            insideFolders_Folders: response.data.folders,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_INSIDE_FOLDERS_FOLDERS_LOADED_FAILURE,
        payload: {
          insideFoldersFoldersLoading: false,
          insideFolders_Folders: [],
        },
      });
    }
  };

  // Create folder
  const createInsideFFs = async (name, id) => {
    try {
      await axios.post(
        `${apiUrl}/insidefoldersfolders/insidefolders-myfolders/create-folder`,
        { name, id }
      );
      await getInsideFoldersAllFolders();
    } catch (error) {
      console.log(error);
    }
  };

  // Update folder
  const updateInsideFFs = async (folder, name) => {
    folder.folderName = name;
    try {
      await axios.put(
        `${apiUrl}/insidefoldersfolders/insidefolders-myfolders/update-folder/${folder._id}`,
        {
          folder,
        }
      );
      await getInsideFoldersAllFolders();
    } catch (error) {
      console.log(error);
    }
  };

  // Get deleted folder
  const getDeletedInsideFFs = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/insidefoldersfolders/insidefolders-myfolders/my-trash`
      );

      if (response.data.success) {
        dispatch({
          type: GET_DELETED_INSIDE_FOLDERS_FOLDERS_SUCCESS,
          payload: {
            deletedInsideFFsLoading: false,
            deletedInsideFFs: response.data.deletedFolders,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_DELETED_INSIDE_FOLDERS_FOLDERS_FAILURE,
        payload: { deletedInsideFFsLoading: false, deletedInsideFFs: [] },
      });
    }
  };

  // Soft delete folder
  const softDeleteInsideFFs = async (id) => {
    try {
      await axios.delete(
        `${apiUrl}/insidefoldersfolders/insidefolders-myfolders/remove-folder/${id}`
      );
      await getInsideFoldersAllFolders();
      await getDeletedInsideFFs();
      await getStarredInsideFFs();
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setModalUndo(false);
    }, 5000);
    setTimeout(() => {
      setModalUndone(false);
    }, 3000);
  };

  // Real delete folder
  const deleteInsideFFs = async (id) => {
    try {
      await axios.delete(
        `${apiUrl}/insidefoldersfolders/insidefolders-myfolders/my-trash/${id}`
      );
      await getDeletedInsideFFs();
    } catch (error) {
      console.log(error);
    }
  };

  // Restore deleted folders
  const restoreInsideFFs = async (id) => {
    try {
      await axios.post(
        `${apiUrl}/insidefoldersfolders/insidefolders-myfolders/my-trash/restore/${id}`
      );
      await getInsideFoldersAllFolders();
      await getDeletedInsideFFs();
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setModalRestore(false);
    }, 5000);
  };

  // Get all starred folders
  const getStarredInsideFFs = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/insidefoldersfolders/insidefolders-myfolders/my-starr`
      );
      if (response.data.success) {
        dispatch({
          type: GET_STARRED_INSIDE_FOLDERS_FOLDERS_SUCCESS,
          payload: {
            starredInsideFFsLoading: false,
            starredInsideFFs: response.data.starredFolders,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_STARRED_INSIDE_FOLDERS_FOLDERS_FAILURE,
        payload: { starredInsideFFsLoading: false, starredInsideFFs: [] },
      });
    }
  };

  // Add starred folder
  const addStarredInsideFFs = async (info) => {
    try {
      await axios.patch(
        `${apiUrl}/insidefoldersfolders/insidefolders-myfolders/my-starr/${info._id}`
      );
      await getStarredInsideFFs();
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setModalAddStarr(false);
    }, 5000);
  };

  // Remove starred folders
  const removeStarredInsideFFs = async (info) => {
    try {
      await axios.patch(
        `${apiUrl}/insidefoldersfolders/insidefolders-myfolders/remove-starr/${info._id}`
      );
      await getStarredInsideFFs();
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setModalAddStarr(false);
    }, 5000);
    setTimeout(() => {
      setModalUndone(false);
    }, 3000);
  };

  return (
    <PostsContext.Provider
      value={{
        postsState,
        getAllPosts,
        dispatch,
        setSelectedFile,
        onFileUpload,
        selectedFile,
        onFileDragDrop,
        dragDropFile,
        setDragDropFile,
        info,
        setInfo,
        showDetail,
        setShowDetail,
        progressUpload,
        setProgressUpload,
        showModalUpload,
        setShowModalUpload,
        selected,
        setSelected,
        showIconNavbarPost,
        setShowIconNavbarPost,
        modalRename,
        setModalRename,
        updatePost,
        softDeletePost,
        getDeletedPosts,
        showIconNavbarTrashPost,
        setShowIconNavbarTrashPost,
        deletePost,
        modalConfirmDelete,
        setModalConfirmDelete,
        modalUndo,
        setModalUndo,
        restorePost,
        modalUndone,
        setModalUndone,
        modalRestore,
        setModalRestore,
        addStarredPosts,
        showMoreActions,
        setShowMoreActions,
        getStarredPosts,
        showIconNavbarStarredPost,
        setShowIconNavbarStarredPost,
        modalAddStarr,
        setModalAddStarr,
        removeStarredPosts,
        searchValue,
        setSearchValue,
        searchFile,
        showIconNavbarSearchPost,
        setShowIconNavbarSearchPost,
        uploadRes,
        setUploadRes,
        modalSepaOrUpda,
        setModalSepaOrUpda,
        keepSeparateFile,
        showModal,
        setShowModal,
        modalCreateFolder,
        setModalCreateFolder,
        valueModalCreate,
        setValueModalCreate,
        getAllFolders,
        createFolder,
        getDeletedFolders,
        softDeleteFolder,
        deleteFolder,
        restoreFolder,
        getStarredFolders,
        addStarredFolders,
        removeStarredFolders,
        getInsideFoldersAllPosts,
        onFileUploadInsideFolders,
        insideDADFile,
        setInsideDADFile,
        keepSeparateFileInsideFolders,
        onFileDDInsideFolders,
        showModalUploadInside,
        setShowModalUploadInside,
        showModalInside,
        setShowModalInside,
        softDeleteInsideFPs,
        deleteInsideFoldersPost,
        restoreInsideFoldersPost,
        getDeletedInsideFPs,
        updateInsideFoldersPosts,
        getStarredInsideFPs,
        addStarredInsideFPs,
        removeStarredInsideFPs,
        getInsideFoldersAllFolders,
        createInsideFFs,
        getDeletedInsideFFs,
        softDeleteInsideFFs,
        deleteInsideFFs,
        restoreInsideFFs,
        getStarredInsideFFs,
        addStarredInsideFFs,
        removeStarredInsideFFs,
        isInTrash,
        setIsInTrash,
        isPost,
        isInsideFP,
        setIsPost,
        setIsInsideFP,
        updateFolder,
        updateInsideFFs,
        isDisable,
        setIsDisable,
        navValue,
        setNavValue,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(PostsContext);
};

export { PostsContext, PostsProvider, useGlobalContext };
