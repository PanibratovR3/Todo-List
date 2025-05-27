class Project {
  #id;
  #name;
  #isSelected;

  constructor(name) {
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.#isSelected = false;
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
}

export { Project };
