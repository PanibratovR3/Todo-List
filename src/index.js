import { Control } from "./control.js";
import { Project } from "./project.js";
import { DOMTodoList } from "./visualize.js";

// const projects = Control.getStorage();
// DOMTodoList.drawAllProjects(projects);

// const addNewProjectButton = document.querySelector(".add-project-button");
// const addNewProjectDialog = document.querySelector(".add-project-dialog");
// const addNewProjectSubmitButton = document.querySelector(
//   ".add-project-submit-button"
// );

// addNewProjectButton.addEventListener("click", () => {
//   addNewProjectDialog.showModal();
// });

// addNewProjectSubmitButton.addEventListener("click", () => {
//   const inputProjectName = document.querySelector("#project-name").value;
//   if (inputProjectName) {
//     const newProject = new Project(inputProjectName);
//     Control.addProjectToStorage(newProject);
//     const form = addNewProjectDialog.querySelector("form");
//     Control.addProjectToStorage;
//     form.reset();
//     addNewProjectDialog.close();
//     DOMTodoList.drawAllProjects(Control.getStorage());
//   }
// });
