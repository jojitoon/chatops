import AsyncStorage from '@react-native-community/async-storage';
import { GET_ALL_USERS_REQUEST, GET_ALL_USERS_ERROR, GET_ALL_USERS_SUCCESS, AUTH_USER_REQUEST, AUTH_USER_ERROR, AUTH_USER_SUCCESS, LOGOUT_USER } from "../types/users";

const INITIAL_STATE = {
  allUsers: [],
  loading: false,
  error: null,
  currentUser: {}
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_ALL_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsers: action.users,
        loading: false
      }
    case AUTH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case AUTH_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.user,
        loading: false
      }
    case LOGOUT_USER:
      return {
        ...state,
        currentUser: {},
        loading: false,
        error: null
      }
    default:
      return state
  }
};

