import todoDOM from './todoDOM';
import deleteIconURL from './delete.png';

export default (deleteProjectHandler, deleteTodoHandler, editTodoHandler, project) => {
    const container = document.createElement('div');

    const div = document.createElement('div');
    const container_name = document.createElement('h2');
    const delete_img = document.createElement('img');
    delete_img.src = deleteIconURL;
    delete_img.setAttribute('data-project_name', project.name);

    delete_img.addEventListener('click', deleteProjectHandler);

    container_name.innerText = project.name;
    div.appendChild(container_name);
    div.appendChild(delete_img);
    container.appendChild(div);
    const container_break = document.createElement('hr');
    container.appendChild(container_break);

    const container_body = document.createElement('div');
    container_body.classList.add('todos-container')
    for (let todo of project.todos)
    {
        container_body.appendChild(todoDOM(deleteTodoHandler, editTodoHandler, todo));
    }
    container.appendChild(container_body);
    
    return container;
}

export let deleteClickedHandler;