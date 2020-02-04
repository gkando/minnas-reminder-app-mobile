import {dummyData} from '../../utils';
import TodoService from '../db';
import TodoModel from '../db/models/TodoModel';

// const resetAction = NavigationActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({ routeName: routeName })
//   ]

// })
// navigation.dispatch(resetAction)

let TodoActions = {
  addItem: async function(item, dispatch) {
    // console.log('addItem:  ', item)
    const data = await TodoService.add(new TodoModel(item));
    this.fetchData(dispatch);
  },
  fetchData: async function(dispatch) {
    const data = await TodoService.findAll();
    return dispatch({
      type: 'FETCH_DATA',
      payload: data,
    });
  },
  delete: function(item, dispatch, navigation) {
    TodoService.delete(item);
    return dispatch({
      type: 'DELETE_ITEM',
      payload: item.id,
    });
  },
  hideItem: async function(id, dispatch) {
    const data = await TodoService.complete(id);
    return dispatch({
      type: 'FETCH_DATA',
      payload: data,
    });
  },
  undoHideItem: async function(id, dispatch) {
    let status = false;
    const data = await TodoService.complete(id, status);
    return dispatch({
      type: 'FETCH_DATA',
      payload: data,
    });
  },
};

module.exports = TodoActions;
