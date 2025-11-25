import projects from "./manage-projects.js";

function showDialog(dialogType, editObject = {}) {
  const dialog = document.createElement("dialog");
  const editForm = document.createElement("form");
  editForm.method = "dialog";

  const formFieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = `Edit ${dialogType}`;
  formFieldset.appendChild(legend);

  let titleP = document.createElement("p");
  let descriptionP = document.createElement("p");
  let notesP = document.createElement("p");

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

  editForm.appendChild(formFieldset);

  dialog.appendChild(editForm);
  document.body.appendChild(dialog);

  dialog.showModal();

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(projects);
    const formData = new FormData(editForm);
    editObject.title = formData.get("title");
    editObject.description = formData.get("description");
    editObject.notes = formData.get("notes");
    // const title = formData.get("title");
    // const description = formData.get("description");
    // const notes = formData.get("notes");

    // console.log("Saved Data:", { title, description, notes });
    dialog.close();
    document.body.removeChild(dialog);
  });
}

export { showDialog };
