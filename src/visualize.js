import { Control } from "./control.js";
import { Task } from "./task.js";
import { Project } from "./project.js";
import "./style.css";

const DOMTodoList = (() => {
  const intitialDraw = () => {
    const header = document.createElement("div");
    header.classList.add("header");
    const headerText = document.createElement("div");
    headerText.classList.add("header-text");
    headerText.textContent = "Todo-List";
    header.appendChild(headerText);
    const addProjectButton = document.createElement("button");
    addProjectButton.classList.add("add-project-button");
    addProjectButton.textContent = "+ Add new project";
    header.appendChild(addProjectButton);
    document.body.appendChild(header);

    const mainContainer = document.createElement("div");
    mainContainer.classList.add("main-container");
    const projectsContainer = document.createElement("div");
    projectsContainer.classList.add("projects-container");
    const projectsHeader = document.createElement("div");
    projectsHeader.classList.add("projects-header");
    projectsHeader.textContent = "Projects";
    const projectsList = document.createElement("div");
    projectsList.classList.add("projects-list");
    projectsContainer.appendChild(projectsHeader);
    projectsContainer.appendChild(projectsList);
    mainContainer.appendChild(projectsContainer);
    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("tasks-container");
    const tasksHeader = document.createElement("div");
    tasksHeader.classList.add("tasks-header");
    tasksHeader.textContent = "Tasks";
    tasksContainer.appendChild(tasksHeader);
    const paraNoTasks = document.createElement("p");
    paraNoTasks.classList.add("no-tasks");
    tasksContainer.appendChild(paraNoTasks);
    const projectIDHidden = document.createElement("input");
    projectIDHidden.type = "hidden";
    tasksContainer.appendChild(projectIDHidden);
    const tasksList = document.createElement("div");
    tasksList.classList.add("tasks-list");
    tasksContainer.appendChild(tasksList);
    mainContainer.appendChild(tasksContainer);
    document.body.appendChild(mainContainer);

    const modalDialogAddProjectContainer = document.createElement("div");
    modalDialogAddProjectContainer.classList.add(
      "modal-dialog-add-project-container"
    );
    const addProjectDialog = document.createElement("dialog");
    addProjectDialog.classList.add("add-project-dialog");
    modalDialogAddProjectContainer.appendChild(addProjectDialog);
    const addProjectHeader = document.createElement("div");
    addProjectHeader.classList.add("add-project-header");
    addProjectHeader.textContent = "Add new project";
    addProjectDialog.appendChild(addProjectHeader);
    const addProjectForm = document.createElement("form");
    addProjectForm.method = "dialog";
    addProjectDialog.appendChild(addProjectForm);
    const addNameProjectRow = document.createElement("div");
    addNameProjectRow.classList.add("add-project-row");
    const addNameProjectLabel = document.createElement("label");
    addNameProjectLabel.setAttribute("for", "project-name");
    addNameProjectLabel.textContent = "Name: ";
    addNameProjectRow.appendChild(addNameProjectLabel);
    const addNameProjectInput = document.createElement("input");
    addNameProjectInput.type = "text";
    addNameProjectInput.id = "project-name";
    addNameProjectInput.required = true;
    addNameProjectRow.appendChild(addNameProjectInput);
    const addNameProjectNonEmptyFlag = document.createElement("span");
    addNameProjectNonEmptyFlag.classList.add("non-empty-flag");
    addNameProjectRow.appendChild(addNameProjectNonEmptyFlag);
    const addNameProjectMonitor = document.createElement("span");
    addNameProjectMonitor.classList.add("add-project-monitor");
    addNameProjectRow.appendChild(addNameProjectMonitor);
    addProjectForm.appendChild(addNameProjectRow);
    const addProjectSettings = document.createElement("div");
    addProjectSettings.classList.add("add-project-settings");
    const addProjectSubmitButton = document.createElement("button");
    addProjectSubmitButton.classList.add("add-project-submit-button");
    addProjectSubmitButton.textContent = "Add";
    addProjectSettings.appendChild(addProjectSubmitButton);
    addProjectForm.appendChild(addProjectSettings);
    document.body.appendChild(modalDialogAddProjectContainer);

    const modalDialogAddTaskContainer = document.createElement("div");
    modalDialogAddTaskContainer.classList.add(
      "modal-dialog-add-task-container"
    );
    const addTaskDialog = document.createElement("dialog");
    addTaskDialog.classList.add("add-task-dialog");
    modalDialogAddTaskContainer.appendChild(addTaskDialog);
    const addTaskHeader = document.createElement("div");
    addTaskHeader.classList.add("add-project-header");
    addTaskHeader.textContent = "Add new task";
    addTaskDialog.append(addTaskHeader);
    const addTaskForm = document.createElement("form");
    addTaskForm.method = "dialog";
    addTaskDialog.appendChild(addTaskForm);
    document.body.appendChild(modalDialogAddTaskContainer);

    const addTaskTitleRow = document.createElement("div");
    addTaskTitleRow.classList.add("add-task-row");
    const addTaskTitleLabel = document.createElement("label");
    addTaskTitleLabel.setAttribute("for", "task-title");
    addTaskTitleLabel.textContent = "Title: ";
    addTaskTitleRow.appendChild(addTaskTitleLabel);
    const addTaskTitleInput = document.createElement("input");
    addTaskTitleInput.type = "input";
    addTaskTitleInput.id = "task-title";
    addTaskTitleInput.required = true;
    addTaskTitleRow.appendChild(addTaskTitleInput);
    const addTaskTitleNonEmptyFlag = document.createElement("span");
    addTaskTitleNonEmptyFlag.classList.add("non-empty-flag");
    addTaskTitleRow.appendChild(addTaskTitleNonEmptyFlag);
    const addTaskTitleMonitor = document.createElement("span");
    addTaskTitleMonitor.classList.add("add-task-monitor");
    addTaskTitleRow.appendChild(addTaskTitleMonitor);
    addTaskForm.appendChild(addTaskTitleRow);

    const addTaskDescriptionRow = document.createElement("div");
    addTaskDescriptionRow.classList.add("add-task-row");
    const addTaskDescriptionLabel = document.createElement("label");
    addTaskDescriptionLabel.setAttribute("for", "task-name");
    addTaskDescriptionLabel.textContent = "Description: ";
    addTaskDescriptionRow.appendChild(addTaskDescriptionLabel);
    const addTaskDescriptionInput = document.createElement("input");
    addTaskDescriptionInput.type = "input";
    addTaskDescriptionInput.id = "task-name";
    addTaskDescriptionInput.required = true;
    addTaskDescriptionRow.appendChild(addTaskDescriptionInput);
    const addTaskDescriptionNonEmptyFlag = document.createElement("span");
    addTaskDescriptionNonEmptyFlag.classList.add("non-empty-flag");
    addTaskDescriptionRow.appendChild(addTaskDescriptionNonEmptyFlag);
    const addTaskDescriptionMonitor = document.createElement("span");
    addTaskDescriptionMonitor.classList.add("add-task-monitor");
    addTaskDescriptionRow.appendChild(addTaskDescriptionMonitor);
    addTaskForm.appendChild(addTaskDescriptionRow);

    const addTaskDueDateRow = document.createElement("div");
    addTaskDueDateRow.classList.add("add-task-row");
    const addTaskDueDateLabel = document.createElement("label");
    addTaskDueDateLabel.setAttribute("for", "task-due-date");
    addTaskDueDateLabel.textContent = "Due date: ";
    addTaskDueDateRow.appendChild(addTaskDueDateLabel);
    const addTaskDueDateInput = document.createElement("input");
    addTaskDueDateInput.type = "date";
    addTaskDueDateInput.id = "task-due-date";
    addTaskDueDateInput.required = true;
    addTaskDueDateRow.appendChild(addTaskDueDateInput);
    const addTaskDueDateNonEmptyFlag = document.createElement("span");
    addTaskDueDateNonEmptyFlag.classList.add("non-empty-flag");
    addTaskDueDateRow.appendChild(addTaskDueDateNonEmptyFlag);
    const addTaskDueDateMonitor = document.createElement("span");
    addTaskDueDateMonitor.classList.add("add-task-monitor");
    addTaskDueDateRow.appendChild(addTaskDueDateMonitor);
    addTaskForm.appendChild(addTaskDueDateRow);

    const priorities = ["low", "medium", "high"];
    const addTaskPriorityRow = document.createElement("div");
    addTaskPriorityRow.classList.add("add-task-row");
    const addTaskPriorityLabel = document.createElement("label");
    addTaskPriorityLabel.setAttribute("for", "task-priority");
    addTaskPriorityLabel.textContent = "Priority: ";
    addTaskPriorityRow.appendChild(addTaskPriorityLabel);
    const addTaskPrioritySelect = document.createElement("select");
    addTaskPrioritySelect.id = "task-priority";
    addTaskPrioritySelect.required = true;
    for (const priority of priorities) {
      const priorityOption = document.createElement("option");
      priorityOption.value = priority;
      priorityOption.textContent =
        priority[0].toUpperCase() + priority.slice(1);
      addTaskPrioritySelect.appendChild(priorityOption);
    }
    addTaskPriorityRow.appendChild(addTaskPrioritySelect);
    const addTaskPriorityNonEmptyFlag = document.createElement("span");
    addTaskPriorityNonEmptyFlag.classList.add("non-empty-flag");
    addTaskPriorityRow.appendChild(addTaskPriorityNonEmptyFlag);
    const addTaskPriorityMonitor = document.createElement("span");
    addTaskPriorityMonitor.classList.add("add-task-monitor");
    addTaskPriorityRow.appendChild(addTaskPriorityMonitor);
    addTaskForm.appendChild(addTaskPriorityRow);

    const addTaskNotesRow = document.createElement("div");
    addTaskNotesRow.classList.add("add-task-row");
    const addTaskNotesLabel = document.createElement("label");
    addTaskNotesLabel.setAttribute("for", "task-notes");
    addTaskNotesLabel.textContent = "Notes: ";
    addTaskNotesRow.appendChild(addTaskNotesLabel);
    const addTaskNotesInput = document.createElement("textarea");
    addTaskNotesInput.id = "task-notes";
    addTaskNotesInput.required = true;
    addTaskNotesRow.appendChild(addTaskNotesInput);
    const addTaskNotesNonEmptyFlag = document.createElement("span");
    addTaskNotesNonEmptyFlag.classList.add("non-empty-flag");
    addTaskNotesRow.appendChild(addTaskNotesNonEmptyFlag);
    const addTaskNotesMonitor = document.createElement("span");
    addTaskNotesMonitor.classList.add("add-task-monitor");
    addTaskNotesRow.appendChild(addTaskNotesMonitor);
    addTaskForm.appendChild(addTaskNotesRow);

    const addTaskSettingsRow = document.createElement("div");
    addTaskSettingsRow.classList.add("add-task-settings");
    const addTaskSubmitButton = document.createElement("button");
    addTaskSubmitButton.classList.add("add-task-submit-button");
    addTaskSubmitButton.textContent = "Add";
    addTaskSettingsRow.appendChild(addTaskSubmitButton);
    addTaskForm.appendChild(addTaskSettingsRow);

    const addNewProjectButton = document.querySelector(".add-project-button");
    const addNewProjectDialog = document.querySelector(".add-project-dialog");
    const addNewProjectSubmitButton = document.querySelector(
      ".add-project-submit-button"
    );

    addNewProjectButton.addEventListener("click", () => {
      addNewProjectDialog.showModal();
    });

    addNewProjectSubmitButton.addEventListener("click", () => {
      const inputProjectName = document.querySelector("#project-name").value;
      if (inputProjectName) {
        const newProject = new Project(inputProjectName);
        Control.addProjectToStorage(newProject);
        const form = addNewProjectDialog.querySelector("form");
        Control.addProjectToStorage;
        form.reset();
        addNewProjectDialog.close();
        DOMTodoList.drawAllProjects(Control.getStorage());
      }
    });
  };
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
    const projectItem = event.target.parentNode;
    const projectID = projectItem.getAttribute("data-project-id");
    Control.deleteProject(projectID);
    if (projectItem.classList.contains("selected")) {
      document.querySelector("input[type='hidden']").value = "";
      const tasksField = document.querySelector(".tasks-list");
      if (tasksField.hasChildNodes()) {
        while (tasksField.firstChild) {
          const element = tasksField.firstChild;
          tasksField.removeChild(element);
        }
      }
    }
    drawAllProjects(Control.getStorage());
  };
  const addTaskHandler = (event) => {
    event.stopPropagation();
    if (event.target.parentNode.classList.contains("selected")) {
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
  return { drawAllProjects, intitialDraw };
})();

export { DOMTodoList };
