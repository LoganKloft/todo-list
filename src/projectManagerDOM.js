import projectDOM from './projectDOM';

export default (deleteProjectHandler, deleteTodoHandler, editTodoHandler, projectManager) => {
    const container = document.createElement('div');

    for (let project of projectManager.projects)
    {
        container.appendChild(projectDOM(deleteProjectHandler, deleteTodoHandler, editTodoHandler, project));
    }

    return container;
}