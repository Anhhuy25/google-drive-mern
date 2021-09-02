import React, { useContext, useReducer, useEffect } from "react";
import axios from "axios";
import authReducer from "../reducers/AuthReducer";
import setAuthToken from "../utils/setAuthToken";
import {
  GET_USERS_LOGINED,
  LOCAL_STORAGE_TOKEN_NAME,
  SET_AUTH,
  apiUrl,
} from "./constants";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
    users: [],
    getUsername: "",
  });

  // Load User
  const userLoad = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.get(`${apiUrl}/auth`);
      var listID = [];
      if (response.data.success) {
        if (localStorage.getItem("listID") !== null) {
          listID = JSON.parse(localStorage.getItem("listID"));
          let checkIDExist = listID.includes(response.data.user._id);
          if (!checkIDExist) {
            listID.push(response.data.user._id);
          }
          // listID = checkIDExist ? listID : listID.push(response.data.user._id);
        } else {
          listID = [response.data.user._id];
        }
        localStorage.setItem("listID", JSON.stringify(listID));
        dispatch({
          type: SET_AUTH,
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: SET_AUTH,
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  // Post IDs all users
  const postIDsAllUsers = async () => {
    try {
      if (localStorage.getItem("listID")) {
        const idUsersLogined = JSON.parse(localStorage.getItem("listID"));
        const response = await axios.post(`${apiUrl}/auth/idusers`, {
          listID: idUsersLogined,
        });
        if (response.data.success) {
          dispatch({
            type: GET_USERS_LOGINED,
            payload: { isAuthenticated: true, users: response.data.users },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${apiUrl}/auth/users/${id}`);
      const idUsersLogined = JSON.parse(localStorage.getItem("listID"));
      const idDeleted = idUsersLogined.filter((userID) => userID !== id);
      if (idDeleted.length <= 0) {
        localStorage.removeItem("listID");
      } else {
        localStorage.setItem("listID", JSON.stringify(idDeleted));
      }
      const response = await axios.post(`${apiUrl}/auth/idusers`, {
        listID: idDeleted,
      });
      if (response.data.success) {
        dispatch({
          type: "GET_USERS_LOGINED",
          payload: { isAuthenticated: true, users: response.data.users },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userLoad();
  }, []);

  // User login function
  const userLogin = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }
      await userLoad();
      await postIDsAllUsers();
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    }
  };

  // User register function
  const userRegister = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userLogin,
        userRegister,
        authState,
        dispatch,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useGlobalContextAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useGlobalContextAuth };
