import { types } from "../types/types";

const initialState = {
  loading: false,
  msgError: null,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UI_SET_ERRORS:
      return {
        ...state,
        msgError: action.payload,
      };
    case types.REMOVE_ERROR:
      return {
        ...state,
        msgError: null,
      };
    case types.START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.FINISH_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
