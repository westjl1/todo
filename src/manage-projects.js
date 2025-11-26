import project from "./project.js";
import todo from "./todo.js";

function createNewProject() {
  const newProject = new project(
    "New Project",
    "This is a New project",
    "These are New project notes."
  );
  const newTodo = new todo(
    "New Todo 1",
    "This is a New todo",
    "2024-12-31",
    "high",
    "These are New todo notes."
  );

  newProject.addTodo(newTodo);
  return newProject;
}

export { createNewProject };
