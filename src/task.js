class Task {
  constructor(title, description, dueDate, priority, notes) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.isCompleted = false;
  }
}

export { Task };
