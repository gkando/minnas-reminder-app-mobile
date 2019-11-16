const TodoService = {
  findAll: function(sortBy) {
    if (!sortBy) sortBy = [['completed', false], ['updatedAt', true]];
    return realm.objects('Todo').sorted(sortBy);
  },

  save: function(realm, todo) {
    if (realm.objects('Todo').filtered("title = '" + todo.title + "'").length) return;

    realm.write(() => {
      todo.updatedAt = new Date();
      realm.create('Todo', todo);
    })
  },

  update: function(todo, callback) {
    if (!callback) return;
    realm.write(() => {
      callback();
      todo.updatedAt = new Date();
    });
  },

  length: function() {
    return realm.objects('Todo').length
  },
  
  guid: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  },

};

export default TodoService