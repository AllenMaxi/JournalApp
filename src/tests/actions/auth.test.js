import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";

import {
  login,
  logOut,
  startLoginEmailPass,
  startLogout,
} from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe("auth tests", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("login and logout should create the respective action", async () => {
    const logged = await login(10, "maxi");

    expect(logged).toEqual({
      type: types.LOGIN,
      payload: {
        uid: 10,
        displayName: "maxi",
      },
    });
    const logout = await logOut();

    expect(logout).toEqual({
      type: types.LOGOUT,
    });
  });
  test("Should logout", async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: "[Auth] Logout" });
    expect(actions[1]).toEqual({ type: "[Notes] Logout Cleaning" });
  });
  test("should login with email and password", async () => {
    let email = "mazi_all@hotmail.com";
    let password = "123456";
    await store.dispatch(startLoginEmailPass(email, password));
    const actions = store.getActions();

    console.log(actions);
  });
});
