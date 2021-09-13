import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null,
};

export function notesReducer(state = initialState, action) {
  switch (action.type) {
    case types.NOTE_ACTIVE:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };
    case types.NOTES_LOADED:
      return {
        ...state,
        notes: [...action.payload],
      };
    case types.UPDATE_NOTES:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };
    case types.REMOVE_NOTE:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case types.LOGOUT_CLEAN:
      return initialState;
    default:
      return state;
  }
}
