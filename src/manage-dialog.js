import {
  storageAvailable,
  getStorage,
  writeToStorage,
  readFromStorage,
  removeFromStorage,
  clearStorage,
} from "./manage-storage.js";

import { writeDom } from "./manage-dom";

function showDialog(editType, editObject = {}, projectsData) {
  const dialog = document.createElement("dialog");
  const editForm = document.createElement("form");
  editForm.method = "dialog";

  const formFieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = `Edit ${editType}`;
  formFieldset.appendChild(legend);

  const titleP = document.createElement("p");
  const descriptionP = document.createElement("p");
  const notesP = document.createElement("p");

  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title:";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "title";
  titleInput.required = true;
  titleInput.value = editObject.title || "";
  titleP.appendChild(titleLabel);
  titleP.appendChild(titleInput);

  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description:";
  const descriptionInput = document.createElement("textarea");
  descriptionInput.name = "description";
  descriptionInput.value = editObject.description || "";
  descriptionP.appendChild(descriptionLabel);
  descriptionP.appendChild(descriptionInput);

  const notesLabel = document.createElement("label");
  notesLabel.textContent = "Notes:";
  const notesInput = document.createElement("textarea");
  notesInput.name = "notes";
  notesInput.value = editObject.notes || "";
  notesP.appendChild(notesLabel);
  notesP.appendChild(notesInput);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Save";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", () => {
    dialog.close();
    document.body.removeChild(dialog);
  });

  formFieldset.appendChild(titleP);
  formFieldset.appendChild(descriptionP);
  formFieldset.appendChild(notesP);
  formFieldset.appendChild(submitButton);
  formFieldset.appendChild(cancelButton);

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(editForm);

    projectsData.forEach((project) => {
      if (editType === "project" && project.id === editObject.id) {
        project.title = formData.get("title");
        project.description = formData.get("description");
        project.notes = formData.get("notes");
      } else if (editType === "todo") {
        project.todos.forEach((todo) => {
          if (todo.id === editObject.id) {
            todo.title = formData.get("title");
            todo.description = formData.get("description");
            todo.notes = formData.get("notes");
          }
        });
      }
      if (storageAvailable("localStorage")) {
        writeToStorage(
          "localStorage",
          "projectData_" + project.id,
          JSON.stringify(project)
        );
      }
    });

    dialog.close();
    document.body.removeChild(dialog);

    writeDom(projectsData);
  });

  editForm.appendChild(formFieldset);
  dialog.appendChild(editForm);
  document.body.appendChild(dialog);

  dialog.showModal();
}

export { showDialog };
