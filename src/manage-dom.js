import { showDialog } from "./manage-dialog";

const contentDiv = document.getElementById("content");

function clearDom() {
  content.innerHTML = "";
  return content.innerHTML === "";
}

function writeDom(projectsData) {
  console.log("Writing to DOM:", projectsData);
  let headerDiv = document.createElement("div");
  headerDiv.id = "header";
  headerDiv.innerHTML = "<h1>Odin's Todo List</h1>";
  contentDiv.appendChild(headerDiv);

  let projectListDiv = document.createElement("div");
  projectListDiv.id = "project-list";

  projectsData.projectList.forEach((project) => {
    let projectDiv = document.createElement("div");

    projectDiv.dataset.projectId = project.id;
    projectDiv.className = "project";
    projectDiv.innerHTML = `<h2>${project.title}</h2><p>${project.description}</p><p>${project.notes}</p>`;

    let projectEditBtn = document.createElement("button");
    projectEditBtn.type = "button";
    projectEditBtn.textContent = "Edit Project";
    projectEditBtn.dataset.projectId = project.id;
    projectEditBtn.addEventListener("click", () => {
      showDialog("project", project);
    });
    projectDiv.appendChild(projectEditBtn);

    let todoListDiv = document.createElement("div");
    todoListDiv.className = "todo-list";

    project.todos.forEach((todo) => {
      let todoDiv = document.createElement("div");

      todoDiv.dataset.todoId = todo.id;
      todoDiv.className = "todo";
      todoDiv.innerHTML = `<h3>${todo.title}</h3><p>${todo.description}</p><p>Due: ${todo.dueDate}</p>`;

      let todoEditBtn = document.createElement("button");
      todoEditBtn.type = "button";
      todoEditBtn.textContent = "Edit Todo";
      todoEditBtn.dataset.todoId = todo.id;
      todoEditBtn.addEventListener("click", () => {
        showDialog("todo", todo);
      });
      todoDiv.appendChild(todoEditBtn);

      todoListDiv.appendChild(todoDiv);
    });

    projectDiv.appendChild(todoListDiv);
    projectListDiv.appendChild(projectDiv);
  });

  contentDiv.appendChild(projectListDiv);
  return true;
}

export { clearDom, writeDom };
