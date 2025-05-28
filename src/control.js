import {
  primaryStorage,
  uploadToLocalStorage,
  downloadFromStorage,
} from "./storage.js";

const Control = (() => {
  const getStorage = () => downloadFromStorage() || primaryStorage;
  const currentStorage = downloadFromStorage() || primaryStorage;
  const addProjectToStorage = (project) => {
    currentStorage.push(project);
    uploadToLocalStorage(currentStorage);
  };
  const setSelectedStateOfProject = (projectId) => {
    const projectIndex = currentStorage.findIndex(
      (project) => project.id === projectId
    );
    currentStorage[projectIndex].isSelected =
      !currentStorage[projectIndex].isSelected;
    for (let i = 0; i < currentStorage.length; i++) {
      if (i != projectIndex && currentStorage[i].isSelected) {
        currentStorage[i].isSelected = !currentStorage[i].isSelected;
      }
    }
    uploadToLocalStorage(currentStorage);
  };
  const deleteProject = (projectId) => {
    const indexToDelete = currentStorage.findIndex(
      (project) => project.id === projectId
    );
    currentStorage.splice(indexToDelete, 1);
    uploadToLocalStorage(currentStorage);
  };
  const addTaskToProject = (projectId, task) => {
    const indexToAdd = currentStorage.findIndex(
      (project) => project.id === projectId
    );
    currentStorage[indexToAdd].tasks.push(task);
    uploadToLocalStorage(currentStorage);
  };
  const setCompleteStateOfTask = (projectID, taskID, newState) => {
    const projectIndex = currentStorage.findIndex(
      (project) => project.id === projectID
    );
    const taskIndex = currentStorage[projectIndex].tasks.findIndex(
      (task) => task.id === taskID
    );
    currentStorage[projectIndex].tasks[taskIndex].isCompleted = newState;
    uploadToLocalStorage(currentStorage);
  };
  return {
    addProjectToStorage,
    getStorage,
    setSelectedStateOfProject,
    deleteProject,
    addTaskToProject,
    setCompleteStateOfTask,
  };
})();

export { Control };
