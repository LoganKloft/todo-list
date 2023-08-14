import projectDOM from './projectDOM';

export default (projectManager) => {
    const container = document.createElement('div');

    for (project of projectManager.projects)
    {
        container.appendChild(projectDOM(project));
    }

    return container;
}