import {
  GET_USERS_LOGINED,
  RETURN_LOGIN,
  SET_AUTH,
} from "../contexts/constants";

const authReducer = (state, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        authLoading: false,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    case RETURN_LOGIN:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        getUsername: action.payload.getUsername,
      };
    case GET_USERS_LOGINED:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        users: action.payload.users,
      };
    default:
      return state;
  }
};

export default authReducer;
