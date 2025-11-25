class projects {
  constructor() {
    this.projectList = [];
  }

  addProject(project) {
    this.projectList.push(project);
  }

  removeProject(projectId) {
    const index = this.projectList.findIndex(
      (project) => project.id === projectId
    );
    if (index !== -1) {
      this.projectList.splice(index, 1);
    }
  }

  setProjects(projects) {
    this.projectList = projects;
  }

  getProjects() {
    return this.projectList;
  }

  getLength() {
    return this.projectList.length;
  }
}

export default projects;
