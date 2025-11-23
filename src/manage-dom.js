const contentDiv = document.getElementById("content");

function clearDom() {  
  content.innerHTML = "";
  return content.innerHTML === "";
}

function writeDom(projectsData) {
  // Implementation for writing to the DOM goes here
  console.log("Writing to DOM:", projectsData);
}

export { clearDom, writeDom };
