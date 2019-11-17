import { dummyData } from "../../utils";
import TodoService from '../db'
import TodoModel from '../db/models/TodoModel';
const API_URL =
  "https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes";



export const toggleFavAction = (episode, state, dispatch) => {
  const episodeInFavourites = state.favourites.includes(episode);
  let dispatchObj = {
    type: "ADD_FAV",
    payload: episode
  };
  if (episodeInFavourites)
    dispatchObj = {
      type: "REMOVE_FAV",
      payload: state.favourites.filter(fav => fav.id !== episode.id)
    };
  return dispatch(dispatchObj);
};

let TodoActions = {
  addItem: async function(item, dispatch) {
    console.log('addItem:  ', item)
    const data = await TodoService.add(new TodoModel(item));
  },
  fetchData: async function(dispatch) {
    const data = await TodoService.findAll();
    return dispatch({
      type: "FETCH_DATA",
      payload: data,
    });
  },
  testAction: () => {
    alert('TEST ACTION');
  }
};

module.exports = TodoActions;