import { createStore } from "redux";

/** ACTION TYPES */
export const ADD_1 = "ADD_1";
export const ADD_2 = "ADD_2";
export const REMOVE_1 = "REMOVE_1";
export const REMOVE_2 = "REMOVE_2";
export const RESET = "RESET";
export const UPDATE_HISTORY = "UPDATE_HISTORY"; // remove history item by index
export const CLEAR_ALL = "CLEAR_ALL";

/** INITIAL STATE */
const initialState = {
  count: 0,                // same as "total"
  history: [],             // e.g., "+1", "-2", "Reset"
};

/** Helper: given a history array of strings, rebuild the running total */
function computeCountFromHistory(history) {
  let running = 0;
  for (const item of history) {
    if (item === "Reset") {
      running = 0;
    } else {
      // item like "+1" or "-2"
      const n = parseInt(item, 10);
      if (!Number.isNaN(n)) running += n;
    }
  }
  return running;
}

/** REDUCER */
function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_1: {
      const newHistory = [...state.history, "+1"];
      return { ...state, count: state.count + 1, history: newHistory };
    }
    case ADD_2: {
      const newHistory = [...state.history, "+2"];
      return { ...state, count: state.count + 2, history: newHistory };
    }
    case REMOVE_1: {
      const newHistory = [...state.history, "-1"];
      return { ...state, count: state.count - 1, history: newHistory };
    }
    case REMOVE_2: {
      const newHistory = [...state.history, "-2"];
      return { ...state, count: state.count - 2, history: newHistory };
    }
    case RESET: {
      const newHistory = [...state.history, "Reset"];
      return { ...state, count: 0, history: newHistory };
    }
    case UPDATE_HISTORY: {
      const idx = action.payload;
      if (idx < 0 || idx >= state.history.length) return state;

      const newHistory = state.history.slice(0, idx).concat(state.history.slice(idx + 1));
      // Recompute so removing "Reset" works correctly
      const newCount = computeCountFromHistory(newHistory);
      return { ...state, count: newCount, history: newHistory };
    }
    case CLEAR_ALL: {
      return { ...state, count: 0, history: [] };
    }
    default:
      return state;
  }
}

export const store = createStore(reducer);
