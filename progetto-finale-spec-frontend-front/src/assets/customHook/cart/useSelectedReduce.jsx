import { useReducer } from "react";

function selectedReducer(state, action) {
  switch (action.type) {
    case "toggle":
      return { ...state, [action.id]: !state[action.id] };
    case "clear":
      return {};
    default:
      return state;
  }
}

export function useSelectedReducer() {
  return useReducer(selectedReducer, {});
}
