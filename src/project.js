class Project {
  #id;
  #name;
  #isSelected;
  #tasks;

  constructor(name) {
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.#isSelected = false;
    this.#tasks = [];
  }

  toggleSelectedStatus() {
    this.#isSelected = !this.#isSelected;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get isSelected() {
    return this.#isSelected;
  }

  get tasks() {
    return this.#tasks;
  }

  addTaskToProject(task) {
    this.#tasks.push(task);
  }

  removeTaskFromProject(idTask) {
    const index = this.#tasks.findIndex((item) => item.id === idTask);
    this.#tasks.splice(index, 1);
  }
}

export { Project };
