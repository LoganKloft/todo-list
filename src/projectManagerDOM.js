import projectDOM from './projectDOM';

export default (deleteProjectHandler, deleteTodoHandler, projectManager) => {
    const container = document.createElement('div');

    for (let project of projectManager.projects)
    {
        container.appendChild(projectDOM(deleteProjectHandler, deleteTodoHandler, project));
    }

    return container;
}