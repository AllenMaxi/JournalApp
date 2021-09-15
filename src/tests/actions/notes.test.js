import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startNewNote } from "../../actions/notes";
import { db } from "../../firebase/firebase-config";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "test",
  },
};

let store = mockStore(initState);

describe("Notes Actions Tests", () => {
  test("must create a new note", async () => {
    await store.dispatch(startNewNote());

    const actions = await store.getActions();

    expect(actions[0]).toEqual({
      type: types.NOTE_ACTIVE,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });
    const docId = actions[0].payload.id;

    await db.doc(`/test/journal/notes/${docId}`).delete();
  });
});
