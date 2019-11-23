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
	    updatedAt: 'date'
	}
    }]
});

let TodoService = {
  findAll: function(sortBy) {
    if (!sortBy) sortBy = [['completed', false], ['updatedAt', true]];
    return repository.objects('Todo').sorted(sortBy);
  },

  save: function(todo) {
    if (repository.objects('Todo').filtered("title = '" + todo.title + "'").length) return;

    repository.write(() => {
      todo.updatedAt = new Date();
      repository.create('Todo', todo);
    })
  },

  update: function(todo, changes) {
    // var obj = repository.objects('Todo');
    console.log(todo, changes)
    repository.write(() => {
    var obj = repository.objects('Todo').filtered("id = '" + todo.id + "'")
      console.log('start', obj[0].title)
      // obj[0].id = todo.id,
      obj[0].title = changes,
      obj[0].updatedAt = new Date();
      console.log('finish', obj[0].title)
    });
  },

  add: (todo) => {
    repository.write(() => {
      repository.create('Todo', todo);
    });
  },

  length: function() {
    return repository.objects('Todo').length
  }
};

// TodoService.save(new TodoModel('Hello Koding'));
// TodoService.save(new TodoModel('Make a Todo App with React Native'));
// TodoService.save(new TodoModel('Check to complete a todo'));
// TodoService.save(new TodoModel('Long press, drag and drop a todo to sort'));
// TodoService.save(new TodoModel('Save data with Realm, save more data, get data, write data, read data.'));
// TodoService.save(new TodoModel('Sync data with Firebase'));

module.exports = TodoService;