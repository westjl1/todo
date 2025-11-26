import {
  storageAvailable,
  getStorage,
  writeToStorage,
  readFromStorage,
  removeFromStorage,
  clearStorage,
} from "./manage-storage.js";
import { showDialog } from "./manage-dialog";
import project from "./project.js";
import todo from "./todo.js";

const contentDiv = document.getElementById("content");

function writeHeader(projectsData) {
  const headerDiv = document.createElement("div");
  headerDiv.id = "header";
  headerDiv.innerHTML = "<h1>Odin's Todo List</h1>";

  const addProjectBtn = document.createElement("button");
  addProjectBtn.type = "button";
  addProjectBtn.textContent = "Add Project";
  addProjectBtn.addEventListener("click", () => {
    const newProject = new project();
    projectsData.push(newProject);
    if (storageAvailable("localStorage")) {
      writeToStorage(
        "localStorage",
        "projectData_" + newProject.id,
        JSON.stringify(newProject)
      );
    }
    writeDom(projectsData);
  });
  headerDiv.appendChild(addProjectBtn);

  contentDiv.appendChild(headerDiv);
}

function writeDom(projectsData) {
  console.log("Writing to DOM:", projectsData);

  content.innerHTML = "";

  writeHeader(projectsData);

  const projectListDiv = document.createElement("div");
  projectListDiv.id = "project-list";

  projectsData.forEach((project) => {
    const projectDiv = document.createElement("div");

    projectDiv.dataset.projectId = project.id;
    projectDiv.className = "project";
    projectDiv.innerHTML = `<h2>${project.title}</h2><p>${project.description}</p><p>${project.notes}</p>`;

    const projectEditBtn = document.createElement("button");
    projectEditBtn.type = "button";
    projectEditBtn.textContent = "Edit Project";
    projectEditBtn.dataset.projectId = project.id;
    projectEditBtn.addEventListener("click", (e) => {
      handleEditButtonClick("project", project, projectsData);
    });
    projectDiv.appendChild(projectEditBtn);

    const projectDeleteBtn = document.createElement("button");
    projectDeleteBtn.type = "button";
    projectDeleteBtn.textContent = "Delete Project";
    projectDeleteBtn.dataset.projectId = project.id;
    projectDeleteBtn.addEventListener("click", (e) => {
      if (storageAvailable("localStorage")) {
        removeFromStorage("localStorage", "projectData_" + project.id);
      }
      const updatedProjects = projectsData.filter((p) => p.id !== project.id);
      writeDom(updatedProjects);
    });
    projectDiv.appendChild(projectDeleteBtn);

    const addTodoBtn = document.createElement("button");
    addTodoBtn.type = "button";
    addTodoBtn.textContent = "Add Todo";
    addTodoBtn.dataset.projectId = project.id;
    addTodoBtn.addEventListener("click", () => {
      const newTodo = new todo(
        "New Todo",
        "This is a New todo",
        "2024-12-31",
        "high",
        "These are New todo notes."
      );
      project.addTodo(newTodo);
      if (storageAvailable("localStorage")) {
        writeToStorage(
          "localStorage",
          "projectData_" + project.id,
          JSON.stringify(project)
        );
      }
      writeDom(projectsData);
    });
    projectDiv.appendChild(addTodoBtn);

    const todoListDiv = document.createElement("div");
    todoListDiv.className = "todo-list";

    project.todos.forEach((todo) => {
      const todoDiv = document.createElement("div");

      todoDiv.dataset.todoId = todo.id;
      todoDiv.className = "todo";
      todoDiv.innerHTML = `
                           <div class="todo-details">
                           <h3>${todo.title}</h3>
                           <p>${todo.description}</p>
                           <p>Due: ${todo.dueDate}</p>
                           <p class=${todo.priority}>Priority: ${todo.priority}</p>
                           <p>${todo.notes}</p>
                           </div>
                           `;

      const todoEditBtn = document.createElement("button");
      todoEditBtn.type = "button";
      todoEditBtn.textContent = "Edit Todo";
      todoEditBtn.dataset.todoId = todo.id;
      todoEditBtn.addEventListener("click", () => {
        handleEditButtonClick("todo", todo, projectsData);
      });
      todoDiv.appendChild(todoEditBtn);

      const todoDeleteBtn = document.createElement("button");
      todoDeleteBtn.type = "button";
      todoDeleteBtn.textContent = "Delete Todo";
      todoDeleteBtn.dataset.todoId = todo.id;
      todoDeleteBtn.addEventListener("click", () => {
        project.removeTodo(todo.id);
        if (storageAvailable("localStorage")) {
          writeToStorage(
            "localStorage",
            "projectData_" + project.id,
            JSON.stringify(project)
          );
        }
        writeDom(projectsData);
      });

      todoDiv.appendChild(todoDeleteBtn);

      todoListDiv.appendChild(todoDiv);
    });

    projectDiv.appendChild(todoListDiv);
    projectListDiv.appendChild(projectDiv);
  });

  contentDiv.appendChild(projectListDiv);
}

function handleEditButtonClick(editType, editItem, projectsData) {
  showDialog(editType, editItem, projectsData);
}

export { writeDom };
