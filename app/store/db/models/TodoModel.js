import Utils from '../utils';

class TodoModel {
  constructor(title, dueDate) {
    this.id = Utils.guid();
    this.title = title;
    this.completed = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deleted = false;
    this.deletedAt = new Date();
    this.completedAt = new Date();
    this.dueDate = new Date(dueDate);
    this.priority = 0;
    // this.items: {type: 'list', objectType: 'TodoList'},
    // this.reminders: {type: 'list', objectType: 'Reminder'},
  }
}
// class TodoModel {
//   constructor(title, completed) {
//     this.id = Utils.guid();
//     this.title = title;
//     this.completed = completed || false;
//     this.createdAt = new Date();
//     this.updatedAt = new Date();
//     this.delete = false;
//     this.deletedAt = null;
//   }
// }

module.exports = TodoModel;
