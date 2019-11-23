import { dummyData } from "../../utils";
import TodoService from '../db'
import TodoModel from '../db/models/TodoModel';

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
  update: () => {return},
  testAction: () => {
    alert('TEST ACTION');
  }
};

module.exports = TodoActions;