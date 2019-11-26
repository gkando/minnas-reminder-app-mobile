import Realm from 'realm';
import TodoModel from './models/TodoModel';

let repository = new Realm({
    schema: [{
	name: 'Todo',
	primaryKey: 'id',
	properties: {
    id: {type: 'string', indexed: true},
    title: 'string',
    completed: 'bool',
    createdAt: 'date',
    updatedAt: 'date',
    delete: 'bool',
    deletedAt: 'date?',
  }
    }]
});

// let todoSchema = {
//   name: 'Todo',
// 	primaryKey: 'id',
// 	properties: {
//     id: {type: 'string', indexed: true},
//     title: 'string',
//     completed: 'bool',
//     createdAt: 'date',
//     updatedAt: 'date',
//     delete: 'bool',
//     deletedAt: 'date',
//   }}
// let newtodoSchema = {
//   name: 'Todo',
// 	primaryKey: 'id',
// 	properties: {
//     id: {type: 'string', indexed: true},
//     title: 'string',
//     completed: 'bool',
//     createdAt: 'date',
//     updatedAt: 'date',
//     delete: 'bool',
//     deletedAt: 'date',
//   }}

// let repository = Realm.open({schema: [todoSchema]})

// let newRealm = new Realm({
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
//     deletedAt: 'date',
//   },
//   schemaVersion: 1
//     }]
// });

// let oldRealm = repository;
// Realm.open({
//   schema: [newtodoSchema],
//   schemaVersion: 1,
//   migration: (oldRealm, newRealm) => {
//     // only apply this change if upgrading to schemaVersion 1
//     if (oldRealm.schemaVersion < 1) {
//       const oldObjects = oldRealm.objects('Todo');
//       const newObjects = newRealm.objects('Todo');

//       // loop through all objects and set the name property in the new schema
//       for (let i = 0; i < oldObjects.length; i++) {
//         newObjects[i].name = 
//       }
//     }
//   }
// }).then(realm => {
//   const fullName = realm.objects('Person')[0].name;
// });

let TodoService = {
  findAll: function(sortBy) {
    // console.log('URL', repository.path)
    if (!sortBy) sortBy = [['completed', false], ['updatedAt', true]];
    // let list = repository.objects('Todo').filtered('delete = false')
    return repository.objects('Todo').filtered('delete = false').sorted(sortBy);
  },

  save: function(todo) {
    if (repository.objects('Todo').filtered("title = '" + todo.title + "'").length) return;
    repository.write(() => {
      todo.updatedAt = new Date();
      repository.create('Todo', todo);
    })
  },

  update: function(todo, changes) {
    repository.write(() => {
      var obj = repository.objects('Todo').filtered("id = '" + todo.id + "'")
      obj[0].title = changes,
      obj[0].updatedAt = new Date();
    });
  },

  add: (todo) => {
    repository.write(() => {
      repository.create('Todo', todo);
    });
  },
  delete: (todo) => {
    console.log('delete', todo)
    repository.write(() => {
      todo.delete = true;
      todo.deletedAt = new Date();
      // repository.delete(todo);
    });
  },

  length: function() {
    return repository.objects('Todo').length
  }
};

TodoService.save(new TodoModel('Hello Koding'));
TodoService.save(new TodoModel('Make a Todo App with React Native'));
TodoService.save(new TodoModel('Check to complete a todo'));
TodoService.save(new TodoModel('Long press, drag and drop a todo to sort'));
TodoService.save(new TodoModel('Save data with Realm, save more data, get data, write data, read data.'));
TodoService.save(new TodoModel('Sync data with Firebase'));

module.exports = TodoService;
