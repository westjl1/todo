class todo {
  constructor(title, description, dueDate, priority, notes) {
    if (!new.target) {
      throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title || "New Todo";
    this.description = description || "Default todo description";
    this.dueDate = dueDate || null;
    this.priority = priority || "low";
    this.notes = notes || "Default todo notes";
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

  get dueDate() {
    return this._dueDate;
  }

  set dueDate(value) {
    this._dueDate = value;
  }

  get priority() {
    return this._priority;
  }

  set priority(value) {
    this._priority = value;
  }

  get notes() {
    return this._notes;
  }

  set notes(value) {
    this._notes = value;
  }
}

todo.prototype.getTodoInfo = function () {
  return {
    id: this.id,
    title: this.title,
    description: this.description,
    dueDate: this.dueDate,
    priority: this.priority,
    notes: this.notes,
  };
};

export default todo;
