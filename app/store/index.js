import React, { useEffect } from "react";
import TodoActions from './actions'

export const Store = React.createContext();

const initialState = {
  episodes: [],
  favourites: [],
  data: [],
  items: [],
  hidden: []
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, items: action.payload };
    case "ADD_FAV":
      return {
        ...state,
        favourites: [...state.favourites, action.payload]
      };
    case "REMOVE_FAV":
      return {
        ...state,
        favourites: action.payload
      };
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case 'DELETE_ITEM':
      const foo = state.items.filter(({ id }) => id !== action.payload)
      console.log(foo.length)
      return {
        ...state
        // items: items.filter(({ id }) => id !== action.payload)
    }
    case 'HIDE_ITEM':
      return {
        ...state,
        hidden: [...state.hidden, state.items.filter(({ id }) => id == action.payload)],
        items: state.items.filter(({ id }) => id !== action.payload)
    }
    case 'UNDO_HIDE_ITEM':
      return {
        ...state,
        hidden: [...state.hidden, state.items.filter(({ id }) => id !== action.payload)],
        items: [...state.items, state.hidden.filter(({ id }) => id == action.payload)]
    }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch, TodoActions };
  useEffect(() => {
    // console.log('state.items.length: ', state.items.length, 'hidden.length:  ', state.hidden.length)
    return () => {
    };
  }, [state])
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
