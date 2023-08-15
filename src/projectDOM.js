import todoDOM from './todoDOM';

export default (project) => {
    const container = document.createElement('div');
    const container_name = document.createElement('h2');
    container_name.innerText = project.name;
    container.appendChild(container_name);
    const container_break = document.createElement('hr');
    container.appendChild(container_break);

    const container_body = document.createElement('div');
    for (let todo of project.todos)
    {
        container_body.appendChild(todoDOM(todo));
    }
    container.appendChild(container_body);
    
    return container;
}