function storageAvailable(type = "localStorage") {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function getStorage(type = "localStorage") {
  return window[type];
}

function writeToStorage(type = "localStorage", key, value) {
  return window[type].setItem(key, value);
}

function readFromStorage(type = "localStorage", key) {
  return window[type].getItem(key);
}

function removeFromStorage(type = "localStorage", key) {
  return window[type].removeItem(key);
}

export {
  storageAvailable,
  getStorage,
  writeToStorage,
  readFromStorage,
  removeFromStorage,
};
