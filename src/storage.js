const primaryStorage = [];

function uploadToLocalStorage(storage) {
  localStorage.setItem("todoStorage", JSON.stringify(storage));
}

function downloadFromStorage() {
  return JSON.parse(localStorage.getItem("todoStorage"));
}

export { primaryStorage, uploadToLocalStorage, downloadFromStorage };
