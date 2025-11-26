import {
  storageAvailable,
  getStorage,
  writeToStorage,
  readFromStorage,
  removeFromStorage,
  clearStorage,
} from "./manage-storage.js";
import { writeDom } from "./manage-dom.js";
import project from "./project.js";
import todo from "./todo.js";

import "./styles.css";

// import odinImage from "./odin.jpeg";
// const image = document.createElement("img");
// image.src = odinImage;
// document.body.appendChild(image);

let myProjects = [];

if (storageAvailable("localStorage")) {
  console.log("Local storage is available.");

  const currentStorage = getStorage("localStorage");

  let storedProjects = [];

  if (currentStorage.length === 0) {
    console.log("No local storage found, initializing storage.");
  } else {
    console.log("Local storage found. Checking for existing project data");

    Object.keys(currentStorage).forEach((key) => {
      if (key.startsWith("projectData_")) {
        const storedProject = readFromStorage("localStorage", key);
        if (storedProject) {
          const projectData = JSON.parse(storedProject);
          storedProjects.push(projectData);
        }
      }
    });
  }

  // //This is for the initial population of local storage for testing
  // myProjects.forEach((newProject) => {
  //   writeToStorage(
  //     "localStorage",
  //     "projectData_" + newProject.id,
  //     JSON.stringify(newProject)
  //   );
  // });

  if (storedProjects.length > 0) {
    const restoredProjects = storedProjects.map((projectData) => {
      const restoredProject = Object.assign(new project(), projectData);
      restoredProject.todos.forEach((todoData, index) => {
        restoredProject.todos[index] = Object.assign(new todo(), todoData);
      });
      return restoredProject;
    });
    myProjects = myProjects.concat(restoredProjects);
  }
} else {
  console.log(
    "Local storage is not available. Refreshing page will cause data loss."
  );
}

if (myProjects.length > 0) {
  writeDom(myProjects);
} else {
  console.log("No projects to display.");
}
