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
    console.log("Name of new project: " + inputProjectName);
    const form = addNewProjectDialog.querySelector("form");
    form.reset();
    addNewProjectDialog.close();
  }
});
