import {
  storageAvailable,
  getStorage,
  writeToStorage,
  readFromStorage,
  removeFromStorage,
} from "./manage-storage.js";
import { clearDom, writeDom } from "./manage-dom.js";
import project from "./project.js";
import todo from "./todo.js";

import "./styles.css";

// import odinImage from "./odin.jpeg";
// const image = document.createElement("img");
// image.src = odinImage;
// document.body.appendChild(image);

let myProjects = [];

let newProject = new project(
  "Sample Project",
  "This is a sample project",
  "These are sample project notes."
);
let newTodo1 = new todo(
  "Sample Todo 1",
  "This is a sample todo",
  "2024-12-31",
  "high",
  "These are sample todo notes."
);
let newTodo2 = new todo(
  "Sample Todo 2",
  "This is a sample todo",
  "2024-12-31",
  "high",
  "These are sample todo notes."
);

newProject.addTodo(newTodo1.getTodoInfo());
newProject.addTodo(newTodo2.getTodoInfo());

myProjects.push(newProject.getProjectInfo());

// console.log("Project Info:", newProject.getProjectInfo());
// console.log("Todo Info:", newTodo.getTodoInfo());

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

  myProjects.forEach((newProject) => {
    writeToStorage(
      "localStorage",
      "projectData_" + newProject.id,
      JSON.stringify(newProject)
    );
  });

  if (storedProjects.length > 0) {
    myProjects = myProjects.concat(storedProjects);
  }

  //   const storedProject = readFromStorage("localStorage", "projectData");
  //   console.log("Stored Project Data:", JSON.parse(storedProject));

  //   removeFromStorage("localStorage", "projectData");
  //   console.log("Project data removed from storage.");
} else {
  console.log(
    "Local storage is not available. Refreshing page will cause data loss."
  );
}

if (myProjects.length > 0) {
  if (clearDom()) {
    writeDom(myProjects);
  } else {
    console.error("Failed to clear DOM content.");
  }
} else {
  console.log("No projects to display.");
}
