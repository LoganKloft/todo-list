import deleteIconURL from './delete.png';

export default (deleteTodoHandler, todo) => {
    const container = document.createElement('div');
    container.setAttribute('data-priority', todo.priority);
    container.setAttribute('data-id', todo.id);

    const container_header = document.createElement('div');
    const container_title = document.createElement('h3');
    container_title.innerText = todo.title;
    const container_subtitle = document.createElement('h4');
    container_subtitle.innerText = todo.date;
    container_header.appendChild(container_title);
    container_header.appendChild(container_subtitle);
    const delete_img = document.createElement('img');
    delete_img.src = deleteIconURL;
    delete_img.setAttribute('data-id', todo.id);
    delete_img.addEventListener('click', deleteTodoHandler);
    container_header.appendChild(delete_img);
    container.appendChild(container_header);

    const container_body = document.createElement('div');
    const container_description = document.createElement('p');
    container_description.innerText = todo.description;
    container_body.appendChild(container_description);
    container.appendChild(container_description);

    return container; 
}