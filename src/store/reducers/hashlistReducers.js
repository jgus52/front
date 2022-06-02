import {
  MY_HASHLIST_REQUEST,
  MY_HASHLIST_SUCCESS,
  MY_HASHLIST_FAIL,
  ALL_HASHLIST_REQUEST,
  ALL_HASHLIST_SUCCESS,
  ALL_HASHLIST_FAIL,
} from "../constants/hashlistConstants";

const initialState = {
  loading: false,
  success: null,
  error: null,
  myhashloading: false,
  myhashlist: [],
  allhashloading: false,
  allhashlist: [],
};

const hashlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_HASHLIST_REQUEST:
      return {
        ...state,
        myhashloading: true,
        success: null,
        error: null,
      };
    case MY_HASHLIST_SUCCESS:
      return {
        ...state,
        myhashloading: false,
        success: action.success,
        myhashlist: action.data,
        error: null,
      };
    case MY_HASHLIST_FAIL:
      return {
        ...state,
        myhashloading: false,
        success: null,
        myhashlist: [],
        error: action.error,
      };
    case ALL_HASHLIST_REQUEST:
      return {
        ...state,
        allhashloading: true,
        success: null,
        error: null,
      };
    case ALL_HASHLIST_SUCCESS:
      return {
        ...state,
        allhashloading: false,
        success: action.success,
        allhashlist: action.data,
        error: null,
      };
    case ALL_HASHLIST_FAIL:
      return {
        ...state,
        allhashloading: false,
        success: null,
        error: action.error,
      };
    default:
      return state;
  }
};

export default hashlistReducer;
