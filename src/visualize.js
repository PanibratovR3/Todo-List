import { Control } from "./control.js";
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
      addTaskButton.addEventListener("click", (event) => {
        event.stopPropagation();
        console.log("Add task");
      });
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
    Control.setSelectedStateOfProject(projectID);
    drawAllProjects(Control.getStorage());
  };
  const deleteHandler = (event) => {
    event.stopPropagation();
    const projectID = event.target.parentNode.getAttribute("data-project-id");
    Control.deleteProject(projectID);
    drawAllProjects(Control.getStorage());
  };
  return { drawAllProjects };
})();

export { DOMTodoList };
