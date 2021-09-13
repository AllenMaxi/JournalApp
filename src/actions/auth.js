import Swal from "sweetalert2";
import { firebase, googleAuth } from "../firebase/firebase-config";
import { types } from "../types/types";
import { noteLogOut } from "./notes";

export const startLoginEmailPass = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((e) => {
        dispatch(finishLoading());
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: e.message,
        });
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({
          displayName: name,
        });

        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: e.message,
        })
      );
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuth)
      .then(({ user }) => {
        dispatch(login(user.uid, user.email));
      });
  };
};

export const login = (uid, displayName) => ({
  type: types.LOGIN,
  payload: {
    uid,
    displayName,
  },
});

export const startLoading = () => ({
  type: types.START_LOADING,
});

export const finishLoading = () => ({
  type: types.FINISH_LOADING,
});

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logOut());
    dispatch(noteLogOut());
  };
};

export const logOut = () => ({
  type: types.LOGOUT,
});
