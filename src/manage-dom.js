const contentDiv = document.getElementById("content");

function clearDom() {
  content.innerHTML = "";
  return content.innerHTML === "";
}

function writeDom(projectsData) {
  // Implementation for writing to the DOM goes here
  console.log("Writing to DOM:", projectsData);
  let headerDiv = document.createElement("div");
  headerDiv.id = "header";
  headerDiv.innerHTML = "<h1>Odin's Todo List Application</h1>";
  contentDiv.appendChild(headerDiv);

  let projectListDiv = document.createElement("div");
  projectListDiv.id = "project-list";

  projectsData.forEach((project) => {
    let projectDiv = document.createElement("div");
    let projectEditBtn = document.createElement("button");
    projectEditBtn.addEventListener("click", () => {
      console.log("Edit button clicked for project ID:", project.id);
    });
    projectEditBtn.textContent = "Edit";
    projectDiv.appendChild(projectEditBtn);
    
    projectDiv.dataset.projectId = project.id;
    projectDiv.className = "project";
    projectDiv.innerHTML = `<h2>${project.name}</h2><p>${project.description}</p>`;

    let todoListDiv = document.createElement("div");
    todoListDiv.className = "todo-list";

    project.todos.forEach((todo) => {
      let todoDiv = document.createElement("div");
      let todoEditBtn = document.createElement("button");
      todoEditBtn.addEventListener("click", () => {
        console.log("Edit button clicked for todo ID:", todo.id);
      });
      todoEditBtn.textContent = "Edit";
      todoDiv.appendChild(todoEditBtn);

      todoDiv.dataset.todoId = todo.id;
      todoDiv.className = "todo";
      todoDiv.innerHTML = `<h3>${todo.title}</h3><p>${todo.description}</p><p>Due: ${todo.dueDate}</p>`;
      todoListDiv.appendChild(todoDiv);
    });

    projectDiv.appendChild(todoListDiv);
    projectListDiv.appendChild(projectDiv);
  });

  contentDiv.appendChild(projectListDiv);
  return true;
}

export { clearDom, writeDom };
