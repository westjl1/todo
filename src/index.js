import {
  storageAvailable,
  getStorage,
  writeToStorage,
  readFromStorage,
  removeFromStorage,
} from "./manage-storage.js";
import { clearDom, writeDom } from "./manage-dom.js";
import projects from "./manage-projects.js";
import project from "./project.js";
import todo from "./todo.js";

import "./styles.css";

// import odinImage from "./odin.jpeg";
// const image = document.createElement("img");
// image.src = odinImage;
// document.body.appendChild(image);

let myProjects = new projects();

//This will be the starting project and todos
//Will be removed when UI is complete
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

newProject.addTodo(newTodo1);
newProject.addTodo(newTodo2);
myProjects.addProject(newProject);

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

  //This is for the initial population of local storage for testing
  myProjects.getProjects().forEach((newProject) => {
    writeToStorage(
      "localStorage",
      "projectData_" + newProject.id,
      JSON.stringify(newProject)
    );
  });

  if (storedProjects.length > 0) {
    const restoredProjects = storedProjects.map((projectData) => {
      const restoredProject = Object.assign(new project(), projectData);
      restoredProject.todos.forEach((todoData, index) => {
        restoredProject.todos[index] = Object.assign(new todo(), todoData);
      });
      return restoredProject;
    });
    myProjects.setProjects(myProjects.getProjects().concat(restoredProjects));
  }
} else {
  console.log(
    "Local storage is not available. Refreshing page will cause data loss."
  );
}

if (myProjects.getLength() > 0) {
  if (clearDom()) {
    writeDom(myProjects);
  } else {
    console.error("Failed to clear DOM content.");
  }
} else {
  console.log("No projects to display.");
}
