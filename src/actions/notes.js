import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

    dispatch(activeNote(doc.id, newNote));
    dispatch(startLoadNotes(uid));
  };
};

export const activeNote = (id, note) => ({
  type: types.NOTE_ACTIVE,
  payload: {
    id,
    ...note,
  },
});

export const startLoadNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.NOTES_LOADED,
  payload: notes,
});

export const startSavedNotes = (note) => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth;
      const noteToFirestore = { ...note };
      delete noteToFirestore.id;

      await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
      console.log(note);

      dispatch(refreshNote(note.id, note));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  };
};

export const refreshNote = (id, note) => ({
  type: types.UPDATE_NOTES,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active } = getState().notes;

    Swal.fire({
      title: "Uploading...",
      text: "Uploading, please wait...",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    const fileUrl = await fileUpload(file);
    active.url = fileUrl;
    dispatch(startSavedNotes(active));
    Swal.close();
  };
};

export const startDeletingNote = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    await db.doc(`${uid}/journal/notes/${id}`).delete();
    dispatch(deleteNote(id));
    dispatch(startLoadNotes(uid));
    Swal.fire({
      icon: "success",
      title: "😎",
      text: "The note has been deleted",
    });
  };
};

export const deleteNote = (id) => ({
  type: types.REMOVE_NOTE,
  payload: id,
});

export const noteLogOut = () => ({
  type: types.LOGOUT_CLEAN,
});
