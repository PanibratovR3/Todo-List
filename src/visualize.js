import { Control } from "./control.js";
import { Task } from "./task.js";
const DOMTodoList = (() => {
  const drawAllProjects = (projects) => {
    const projectsContainer = document.querySelector(".projects-list");
    if (projectsContainer.hasChildNodes()) {
      while (projectsContainer.firstChild) {
        const element = projectsContainer.firstChild;
        projectsContainer.removeChild(element);
      }
    }
    const projectElements = projects.map((project) => {
      const projectElement = document.createElement("div");
      projectElement.classList.add("projects-item");
      if (project.isSelected) {
        projectElement.classList.add("selected");
      }
      projectElement.setAttribute("data-project-id", project.id);
      projectElement.addEventListener("click", selectHandler);
      const projectElementText = document.createElement("div");
      projectElementText.classList.add("projects-text");
      projectElementText.textContent = project.name;
      projectElementText.addEventListener("click", (event) =>
        event.stopPropagation()
      );
      projectElement.appendChild(projectElementText);

      const addTaskButton = document.createElement("button");
      addTaskButton.classList.add("project-control");
      addTaskButton.classList.add("add-task");
      addTaskButton.textContent = "Add task";
      addTaskButton.addEventListener("click", addTaskHandler);
      projectElement.appendChild(addTaskButton);

      const deleteProjectButton = document.createElement("button");
      deleteProjectButton.classList.add("project-control");
      deleteProjectButton.classList.add("delete-project");
      deleteProjectButton.textContent = "Delete";
      deleteProjectButton.addEventListener("click", deleteHandler);
      projectElement.appendChild(deleteProjectButton);
      return projectElement;
    });
    for (const projectElement of projectElements) {
      projectsContainer.appendChild(projectElement);
    }
  };
  const selectHandler = (event) => {
    const projectID = event.target.getAttribute("data-project-id");
    if (!event.target.classList.contains("selected")) {
      Control.setSelectedStateOfProject(projectID);
      drawAllProjects(Control.getStorage());
    }
  };
  const deleteHandler = (event) => {
    event.stopPropagation();
    const projectID = event.target.parentNode.getAttribute("data-project-id");
    Control.deleteProject(projectID);
    drawAllProjects(Control.getStorage());
  };
  const addTaskHandler = (event) => {
    event.stopPropagation();
    if (event.target.parentNode.classList.contains("selected")) {
      console.log("Can add.");
      console.log("Add task");
      const projectID = event.target.parentNode.getAttribute("data-project-id");
      const addNewTaskDialog = document.querySelector(".add-task-dialog");
      addNewTaskDialog.showModal();
      const addTaskSubmitButton = document.querySelector(
        ".add-task-submit-button"
      );
      addTaskSubmitButton.addEventListener("click", (event) => {
        const titleValue = document.querySelector("#task-title").value;
        const descriptionValue = document.querySelector("#task-name").value;
        const dueDateValue = document.querySelector("#task-due-date").value;
        const priorityValue = document.querySelector("#task-priority").value;
        const notesValue = document.querySelector("#task-notes").value;
        if (titleValue && descriptionValue && dueDateValue && notesValue) {
          console.log("Adding...");
          const form = addNewTaskDialog.querySelector("form");
          form.reset();
          addNewTaskDialog.close();
          console.log("Title: ", titleValue);
          console.log("Description: ", descriptionValue);
          console.log("Due date: ", dueDateValue);
          console.log("Priority: ", priorityValue);
          console.log("Notes: ", notesValue);
          // const newTask = new Task()
        }
      });
    }
  };
  return { drawAllProjects };
})();

export { DOMTodoList };
