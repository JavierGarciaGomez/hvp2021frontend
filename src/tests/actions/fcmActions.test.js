import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";
import "@testing-library/jest-dom";
import { startLoadingAllFcm } from "../../actions/fcmActions";
import { types } from "../../types/types";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

let token = "";

describe("Pruebas en las acciones Auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("loading packages corecto", async () => {
    await store.dispatch(startLoadingAllFcm());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.fcmsIsLoading,
    });
    expect(actions[1]).toEqual({
      type: types.fcmsFinishedLoading,
    });

    // console.log(localStorage.setItem.mock.calls[0][1])
  });
});
