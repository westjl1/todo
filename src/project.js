class project {
  constructor(title, description, notes, todos) {
    if (!new.target) {
      throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title || "New Project";
    this.description = description || "Default project description";
    this.notes = notes || "Default project notes";
    this.todos = todos || [];
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }

  get notes() {
    return this._notes;
  }

  set notes(value) {
    this._notes = value;
  }

  get todos() {
    return this._todos;
  }

  set todos(value) {
    this._todos = value;
  }

  addTodo = (todo) => {
    this.todos.push(todo);
  };

  removeTodo = (todoId) => {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  };
}

project.prototype.getProjectInfo = function () {
  return {
    id: this.id,
    title: this.title,
    description: this.description,
    notes: this.notes,
    todos: this.todos,
  };
};

export default project;
