import { types } from "../types/types";

describe("types tests", () => {
  test("types equal to object", () => {
    expect(types).toEqual({
      LOGIN: "[Auth] Login",
      LOGOUT: "[Auth] Logout",

      UI_SET_ERRORS: "[UI] Set Error",
      REMOVE_ERROR: "[UI] Remove Error",
      START_LOADING: "[UI] Start Loading",
      FINISH_LOADING: "[UI] Finish Loading",

      ADD_NEW_NOTES: "[Notes] New Notes",
      NOTE_ACTIVE: "[Notes] Note Active",
      REMOVE_NOTE: "[Notes] Remove Note",
      NOTES_LOADED: "[Notes] Notes Loaded",
      UPDATE_NOTES: "[Notes] Update Notes",
      NOTE_FILE_URL: "[Notes] File URL",
      LOGOUT_CLEAN: "[Notes] Logout Cleaning",
    });
  });
});
