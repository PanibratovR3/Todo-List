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
        drawAllTasks(project.id, project.tasks);
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
  const drawAllTasks = (projectID, tasks) => {
    const paragraphNoTasks = document.querySelector(".no-tasks");
    const inputProjectID = document.querySelector("input[type='hidden']");
    const tasksList = document.querySelector(".tasks-list");
    inputProjectID.value = projectID;

    if (tasksList.hasChildNodes()) {
      while (tasksList.firstChild) {
        const element = tasksList.firstChild;
        tasksList.removeChild(element);
      }
    }
    if (tasks.length === 0) {
      paragraphNoTasks.textContent = "No tasks for this project.";
    } else {
      paragraphNoTasks.textContent = "";
      const tasksElements = tasks.map((task) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task-item");
        taskElement.classList.add(task.priority);
        taskElement.setAttribute("data-task-id", task.id);
        const taskElementTitle = document.createElement("div");
        taskElementTitle.classList.add("task-title");
        if (task.isCompleted) {
          taskElementTitle.classList.add("complete");
        } else {
          taskElementTitle.classList.remove("complete");
        }
        taskElementTitle.textContent = task.title;
        taskElement.appendChild(taskElementTitle);

        const descriptionRow = document.createElement("div");
        descriptionRow.classList.add("task-row");
        const descriptionLabel = document.createElement("div");
        descriptionLabel.classList.add("task-label");
        descriptionLabel.textContent = "Description: ";
        descriptionRow.appendChild(descriptionLabel);
        const descriptionText = document.createElement("div");
        descriptionText.classList.add("task-text");
        descriptionText.textContent = task.description;
        descriptionRow.appendChild(descriptionText);
        taskElement.appendChild(descriptionRow);

        const dueDateRow = document.createElement("div");
        dueDateRow.classList.add("task-row");
        const dueDateLabel = document.createElement("div");
        dueDateLabel.classList.add("task-label");
        dueDateLabel.textContent = "Due date: ";
        dueDateRow.appendChild(dueDateLabel);
        const dueDateText = document.createElement("div");
        dueDateText.classList.add("task-duedate");
        dueDateText.textContent = task.dueDate;
        dueDateRow.appendChild(dueDateText);
        taskElement.appendChild(dueDateRow);

        const priorityRow = document.createElement("div");
        priorityRow.classList.add("task-row");
        const priorityLabel = document.createElement("div");
        priorityLabel.classList.add("task-label");
        priorityLabel.textContent = "Priority: ";
        priorityRow.appendChild(priorityLabel);
        const priorityText = document.createElement("div");
        priorityText.classList.add("task-text");
        priorityText.textContent =
          task.priority[0].toUpperCase() + task.priority.slice(1);
        priorityRow.appendChild(priorityText);
        taskElement.appendChild(priorityRow);

        const notesRow = document.createElement("div");
        notesRow.classList.add("task-row");
        const notesLabel = document.createElement("div");
        notesLabel.classList.add("task-label");
        notesLabel.textContent = "Notes: ";
        notesRow.appendChild(notesLabel);
        const notesText = document.createElement("div");
        notesText.classList.add("task-text");
        notesText.textContent = task.notes;
        notesRow.appendChild(notesText);
        taskElement.appendChild(notesRow);

        const taskCompleteRow = document.createElement("div");
        taskCompleteRow.classList.add("task-complete-row");
        const inputCompleteCheckbox = document.createElement("input");
        inputCompleteCheckbox.setAttribute("type", "checkbox");
        inputCompleteCheckbox.setAttribute("id", "complete-task");
        inputCompleteCheckbox.checked = task.isCompleted ? true : false;
        taskCompleteRow.appendChild(inputCompleteCheckbox);
        taskElement.appendChild(taskCompleteRow);
        const inputCompleteLabel = document.createElement("label");
        inputCompleteLabel.setAttribute("for", "complete-task");
        inputCompleteLabel.textContent = "Mark as complete";
        taskCompleteRow.appendChild(inputCompleteLabel);
        inputCompleteCheckbox.addEventListener(
          "change",
          toggleCompleteStatusHandler
        );
        taskElement.appendChild(taskCompleteRow);
        const taskControlRow = document.createElement("div");
        taskControlRow.classList.add("task-control-row");
        const taskButtonDelete = document.createElement("button");
        taskButtonDelete.classList.add("task-button");
        taskButtonDelete.classList.add("delete");
        taskButtonDelete.textContent = "Delete";
        taskButtonDelete.addEventListener("click", deleteTaskHandler);
        taskControlRow.appendChild(taskButtonDelete);
        taskElement.appendChild(taskControlRow);

        return taskElement;
      });
      for (const taskElement of tasksElements) {
        tasksList.appendChild(taskElement);
      }
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
        const projectID = document
          .querySelector(".projects-item.selected")
          .getAttribute("data-project-id");
        if (titleValue && descriptionValue && dueDateValue && notesValue) {
          const form = addNewTaskDialog.querySelector("form");
          form.reset();
          addNewTaskDialog.close();
          const newTask = new Task(
            titleValue,
            descriptionValue,
            dueDateValue,
            priorityValue,
            notesValue
          );
          console.log(projectID);
          Control.addTaskToProject(projectID, newTask);
          drawAllProjects(Control.getStorage());
        }
      });
    }
  };
  const toggleCompleteStatusHandler = (event) => {
    const completeStatusFlag = event.target.checked;
    const taskElement = event.target.parentNode.parentNode;
    const taskID = taskElement.getAttribute("data-task-id");
    const projectID = document.querySelector("input[type='hidden']").value;
    Control.setCompleteStateOfTask(projectID, taskID, completeStatusFlag);
    drawAllProjects(Control.getStorage());
  };
  const deleteTaskHandler = (event) => {
    const controlRow = event.target.parentNode;
    const taskElement = controlRow.parentNode;
    const taskID = taskElement.getAttribute("data-task-id");
    const projectID = document.querySelector("input[type='hidden']").value;
    Control.deleteTaskFromProject(projectID, taskID);
    drawAllProjects(Control.getStorage());
  };
  return { drawAllProjects };
})();

export { DOMTodoList };
