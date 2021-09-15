import { removeError, setError } from "../../actions/ui";
import { types } from "../../types/types";

describe("UI tests", () => {
  test("all actions should work", () => {
    const action = setError("this action dont work");
    expect(action).toEqual({
      type: types.UI_SET_ERRORS,
      payload: "this action dont work",
    });

    const remove = removeError();

    expect(remove).toEqual({
      type: types.REMOVE_ERROR,
    });
  });
});
