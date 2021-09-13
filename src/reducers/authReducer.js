import { types } from "../types/types";

export function authReducer(state = {}, action) {
  switch (action.type) {
    case types.LOGIN:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
      };
    case types.LOGOUT:
      return {};

    default:
      return state;
  }
}
