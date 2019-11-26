import Utils from '../utils';

class TodoModel {
  constructor(title, completed) {
    this.id = Utils.guid();
    this.title = title;
    this.completed = completed || false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.delete = false;
    this.deletedAt = null;
  }
}

module.exports = TodoModel;