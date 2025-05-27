class Task {
  #id;
  #title;
  #description;
  #dueDate;
  #priority;
  #notes;
  #isCompleted;

  constructor(title, description, dueDate, priority, notes) {
    this.#id = crypto.randomUUID();
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#notes = notes;
    this.#isCompleted = false;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  set title(newTitle) {
    this.#title = newTitle;
  }

  get description() {
    return this.#description;
  }

  set description(newDescription) {
    this.#description = newDescription;
  }

  get dueDate() {
    return this.#dueDate;
  }

  set dueDate(newDueDate) {
    this.#dueDate = newDueDate;
  }

  get priority() {
    return this.#priority;
  }

  set priority(newPriority) {
    this.#priority = newPriority;
  }

  get notes() {
    return this.#notes;
  }

  set notes(newNotes) {
    this.#notes = newNotes;
  }

  get isCompleted() {
    return this.#isCompleted;
  }

  toggleCompleteStatus() {
    this.#isCompleted = !this.#isCompleted;
  }
}

export { Task };
