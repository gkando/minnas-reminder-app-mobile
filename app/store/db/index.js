import Realm from 'realm';
import TodoModel from './models/TodoModel';
const dayjs = require('dayjs');
// const calendar = require('dayjs/plugin/calendar');
import calendar from './calendar';
dayjs.extend(calendar);
const _ = require('lodash');

// let repository = new Realm({
//     schema: [{
// 	name: 'Todo',
// 	primaryKey: 'id',
// 	properties: {
//     id: {type: 'string', indexed: true},
//     title: 'string',
//     completed: 'bool',
//     createdAt: 'date',
//     updatedAt: 'date',
//     delete: 'bool',
//     deletedAt: 'date?',
//   }
//     }]
// });

export class TodoList extends Realm.Object {}
TodoList.schema = {
  name: 'TodoList',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    createdAt: 'date',
    updatedAt: 'date',
    deleted: 'bool',
    deletedAt: 'date',
    completed: {type: 'bool', default: false},
    completedAt: 'date',
    dueDate: 'date',
    priority: 'int',
    items: {type: 'list', objectType: 'TodoList'},
    reminders: {type: 'list', objectType: 'Reminder'},
  },
};

class Reminder extends Realm.Object {}
Reminder.schema = {
  name: 'Reminder',
  properties: {
    date: 'string',
    creationDate: 'date',
    dueDate: 'date',
    dueTimezone: 'string',
    name: 'string',
  },
};

let repository = new Realm({schema: [TodoList, Reminder]});

// let groupToDay = function(group, day) {
//   // console.log(day)
//   // console.log(dayjs(dayjs(day, "MM-DD-YYYY")).calendar(null, {
//   //   sameDay: '[Today]', // The same day ( Today at 2:30 AM )
//   //   nextDay: '[Tomorrow]', // The next day ( Tomorrow at 2:30 AM )
//   //   nextWeek: 'dddd', // The next week ( Sunday at 2:30 AM )
//   //   lastDay: '[Yesterday]', // The day before ( Yesterday at 2:30 AM )
//   //   lastWeek: '[Last] dddd', // Last week ( Last Monday at 2:30 AM )
//   //   sameElse: 'DD/MM/YYYY' // Everything else ( 7/10/2011 )
//   // }))
//   return {
//     // title: dayjs(day, "MM-DD-YYYY").format('ddd MMM D'),
//     title: dayjs(dayjs(day, 'MM-DD-YYYY')).calendar(null, {
//       sameDay: '[Today]', // The same day ( Today at 2:30 AM )
//       nextDay: '[Tomorrow]', // The next day ( Tomorrow at 2:30 AM )
//       nextWeek: 'dddd', // The next week ( Sunday at 2:30 AM )
//       lastDay: '[Yesterday]', // The day before ( Yesterday at 2:30 AM )
//       lastWeek: '[Last] dddd', // Last week ( Last Monday at 2:30 AM )
//       sameElse: 'DD/MM/YYYY', // Everything else ( 7/10/2011 )
//     }),
//     data: group,
//     order: day,
//   };
// };

let groupToDay = function(group, day) {
  return {
    // title: dayjs(day, "MM-DD-YYYY").format('ddd MMM D'),
    title: dayjs(dayjs(day, 'MM-DD-YYYY')).calendar(null, {
      sameDay: '[Today]', // The same day ( Today at 2:30 AM )
      nextDay: '[Tomorrow]', // The next day ( Tomorrow at 2:30 AM )
      nextWeek: 'dddd', // The next week ( Sunday at 2:30 AM )
      lastDay: '[Yesterday]', // The day before ( Yesterday at 2:30 AM )
      lastWeek: '[Last] dddd', // Last week ( Last Monday at 2:30 AM ),
      twoWeeks: '[Two Weeks From Now]',
      lastMonth: '[Last Month]',
      sameElse: 'MMM-YYYY', // Everything else ( 7/10/2011 )
    }),
    data: group,
    order: day,
  };
};

const date = item => dayjs(item.dueDate).format('YYYY-MM-DD');

let TodoService = {
  findAll: function(sortBy) {
    // console.log('URL', repository.path)
    if (!sortBy)
      sortBy = [
        ['completed', false],
        ['updatedAt', true],
      ];
    let results = repository
      .objects('TodoList')
      .filtered('completed = false')
      .sorted(sortBy);
    var result = _.chain(results)
      .groupBy(date)
      .map(groupToDay)
      .orderBy(['order'], ['asc'])
      .value();
    console.log(result);
    return result;
    // return repository.objects('TodoList').filtered('completed = false').sorted(sortBy);
  },
  save: function(todo) {
    if (
      repository.objects('TodoList').filtered("title = '" + todo.title + "'")
        .length
    )
      return;
    repository.write(() => {
      todo.updatedAt = new Date();
      repository.create('TodoList', todo);
    });
  },
  update: function(todo, changes) {
    repository.write(() => {
      var obj = repository
        .objects('TodoList')
        .filtered("id = '" + todo.id + "'");
      (obj[0].title = changes), (obj[0].updatedAt = new Date());
    });
  },
  add: todo => {
    repository.write(() => {
      repository.create('TodoList', todo);
    });
  },
  delete: todo => {
    // console.log('delete', todo)
    repository.write(() => {
      todo.deleted = true;
      todo.deletedAt = new Date();
    });
  },
  complete: async function(id, status = true) {
    var obj = repository.objects('TodoList').filtered("id = '" + id + "'");
    repository.write(() => {
      (obj[0].completed = status), (obj[0].updatedAt = new Date());
    });
    const data = await this.findAll();
    return data;
  },
  length: function() {
    return repository.objects('TodoList').length;
  },
};

// TodoService.save(new TodoModel('Walk Bjorn'));
// TodoService.save(new TodoModel('Feed Miller'));
// TodoService.add(
//   new TodoModel('Make a Todo App with React Native', '1/31/2020'),
// );
// TodoService.add(new TodoModel('Go for a run', '1/15/2020'));
// TodoService.add(new TodoModel('Food shopping', '2/15/2020'));
// TodoService.save(new TodoModel('Check to complete a todo'));
// TodoService.save(new TodoModel('Long press, drag and drop a todo to sort'));
// TodoService.save(new TodoModel('Save data with Realm, save more data, get data, write data, read data.'));
// TodoService.save(new TodoModel('Sync data with Firebase'));

module.exports = TodoService;
