const primaryStorage = [];

function uploadToLocalStorage(storage) {
  localStorage.setItem("todoStorage", JSON.stringify(storage));
}

function downloadFromStorage() {
  const response = JSON.parse(localStorage.getItem("todoStorage"))
    ? JSON.parse(localStorage.getItem("todoStorage"))
    : primaryStorage;
  return response;
}

export { primaryStorage, uploadToLocalStorage, downloadFromStorage };
