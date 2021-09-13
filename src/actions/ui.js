import { types } from "../types/types";

export const setError = (error) => ({
  type: types.UI_SET_ERRORS,
  payload: error,
});

export const removeError = () => ({
  type: types.REMOVE_ERROR,
});
