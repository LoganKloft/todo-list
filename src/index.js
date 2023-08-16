import './index.css';
import { ProjectManager } from './projectManager';
import { Project } from './project';
import { Todo } from './todo';
import projectManagerDOM from './projectManagerDOM';

const container = document.getElementById('container');

// attempt to load ProjectManager from localStorage
let projectManager = new ProjectManager();

let projectManagerData = globalThis.localStorage.getItem('projectManager');
if (projectManagerData !== null)
{
    projectManagerData = JSON.parse(projectManagerData);
    for (let project of projectManagerData.projects)
    {
        projectManager.AddProject(new Project(project.name));
        for (let todo of project.todos)
        {
            projectManager.AddTodo(new Todo(todo.title, todo.date, todo.description, todo.priority, todo.project_name));
        }
    }
    container.innerHTML = '';
    container.appendChild(projectManagerDOM(deleteProjectHandler, deleteTodoHandler, editTodoHandler, projectManager));
}

// handle new todo form
let todo_form = document.getElementById('todo-form');
todo_form.addEventListener('submit', (event) => {
    // add todo item to projectManager
    const formData = new FormData(todo_form);
    projectManager.AddTodo(new Todo(formData.get('title'), formData.get('date'), formData.get('description'), formData.get('priority'), formData.get('project_name')));

    // update display
    container.innerHTML = '';
    container.appendChild(projectManagerDOM(deleteProjectHandler, deleteTodoHandler, editTodoHandler, projectManager));        

    // save new projectManager by overwriting the previous
    storeProjectManager(projectManager);

    // reset the form
    todo_form.reset();

    // prevent page refresh
    event.preventDefault();
});

// handle new project form
let project_form = document.getElementById('project-form');
project_form.addEventListener('submit', (event) => {
    // add project to projectManager
    const formData = new FormData(project_form);
    projectManager.AddProject(new Project(formData.get('project_name')));

    // update display
    container.innerHTML = '';
    container.appendChild(projectManagerDOM(deleteProjectHandler, deleteTodoHandler, editTodoHandler, projectManager));        

    // save new projectManager by overwriting the previous
    storeProjectManager(projectManager);

    // reset the form
    project_form.reset();

    // prevent page refresh
    event.preventDefault();
})

// handle deleting a todo item
function deleteTodoHandler(event) {
    projectManager.RemoveTodo(event.target.getAttribute('data-id'));

    container.innerHTML = '';
    container.appendChild(projectManagerDOM(deleteProjectHandler, deleteTodoHandler, editTodoHandler, projectManager));

    storeProjectManager(projectManager);
}

// close edit-todo-dialog
const closeTodoDialogBtn = document.getElementById('close-todo-dialog-btn');
closeTodoDialogBtn.addEventListener('click', () => {
    editTodoDialog.close();
});
// handle editing a todo item
const editTodoDialog = document.getElementById('edit-todo-dialog');
function editTodoHandler(event) {
    // prepopulate dialog
    editTodoForm.elements['title'].value = event.target.getAttribute('data-title');
    editTodoForm.elements['date'].value = event.target.getAttribute('data-date');
    editTodoForm.elements['description'].value = event.target.getAttribute('data-description');
    editTodoForm.elements['priority'].value = event.target.getAttribute('data-priority');
    editTodoForm.elements['project_name'].value = event.target.getAttribute('data-project_name');
    editTodoForm.elements['id'].value = event.target.getAttribute('data-id');

    // show
    editTodoDialog.showModal();
}

// handle deleting a project
function deleteProjectHandler(event) {
    projectManager.RemoveProject(event.target.getAttribute('data-project_name'));

    container.innerHTML = '';
    container.appendChild(projectManagerDOM(deleteProjectHandler, deleteTodoHandler, editTodoHandler,projectManager));

    storeProjectManager(projectManager);
}

// stores projectManager data (attributes that aren't functions)
// in localStorage
function storeProjectManager(projectManager)
{
    try { 
        globalThis.localStorage.setItem('projectManager', JSON.stringify(projectManager.GetStringObject()));
    } catch(error) { 
        console.log(error);
    }
}

// clear storage
document.getElementById('clear-storage-button').addEventListener('click', () => {
    // clear local storage
    globalThis.localStorage.clear();

    // refresh page
    location.reload();
});

// handle submitting form in edit-todo-dialog
const editTodoForm = document.getElementById('edit-todo-form');
editTodoForm.addEventListener('submit', (event) => {
    // retrieve the form data
    const formData =  new FormData(editTodoForm);
    const title = formData.get('title');
    const description = formData.get('description');
    const date = formData.get('date');
    const priority = formData.get('priority');
    const project_name = formData.get('project_name');
    const id = formData.get('id');

    // get the todo and update its values
    const todo = projectManager.GetTodo(id);
    if (todo !== null)
    {
        todo.title = title;
        todo.description = description;
        todo.date = date;
        todo.priority = priority;

        // if we changed the project_name,
        // we'll need to remove the todo from that project
        // and then add it to the correct project
        if (todo.project_name !== project_name)
        {
            projectManager.RemoveTodo(id);
            todo.project_name = project_name;
            projectManager.AddTodo(todo);
        }

        // update display
        container.innerHTML = '';
        container.appendChild(projectManagerDOM(deleteProjectHandler, deleteTodoHandler, editTodoHandler, projectManager));        

        // save projectManager by overwriting the previous
        storeProjectManager(projectManager);
    }
})