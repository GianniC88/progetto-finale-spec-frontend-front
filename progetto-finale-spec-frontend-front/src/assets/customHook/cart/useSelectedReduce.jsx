import { useReducer } from "react";

// Reducer che gestisce lo stato di selezione delle checkbox nel carrello.
// Lo stato è un oggetto del tipo: { [idProdotto]: true/false }
function selectedReducer(state, action) {
  switch (action.type) {
    case "toggle":
      // Inverte lo stato di selezione dell'id passato (se non esiste, diventa true).
      return { ...state, [action.id]: !state[action.id] };
    case "clear":
      // Resetta tutte le selezioni.
      return {};
    default:
      return state;
  }
}

// Custom hook che espone [selected, dispatchSelected]
// - selected: mappa id -> boolean
// - dispatchSelected: invia azioni (toggle/clear)
export function useSelectedReducer() {
  return useReducer(selectedReducer, {});
}
