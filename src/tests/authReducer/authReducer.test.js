import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("authReducer tests", () => {
  test("should perform the login", () => {
    const initState = {};
    const action = {
      type: types.LOGIN,
      payload: {
        uid: "abc",
        displayName: "maxi",
      },
    };
    const state = authReducer(initState, action);

    expect(state).toEqual({
      uid: "abc",
      name: "maxi",
    });
  });
  test("should logout", () => {
    const initState = {
      uid: "abc",
      name: "maxi",
    };
    const action = {
      type: types.LOGOUT,
    };
    const state = authReducer(initState, action);

    expect(state).toEqual({});
  });
});
