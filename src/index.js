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
    container.appendChild(projectManagerDOM(projectManager));
}

// handle new todo form
let todo_form = document.getElementById('todo-form');
todo_form.addEventListener('submit', (event) => {
    // add todo item to projectManager
    const formData = new FormData(todo_form);
    projectManager.AddTodo(new Todo(formData.get('title'), formData.get('date'), formData.get('description'), formData.get('priority'), formData.get('project_name')));

    // update display
    container.innerHTML = '';
    container.appendChild(projectManagerDOM(projectManager));        

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
    container.appendChild(projectManagerDOM(projectManager));        

    // save new projectManager by overwriting the previous
    storeProjectManager(projectManager);

    // reset the form
    project_form.reset();

    // prevent page refresh
    event.preventDefault();
})

// handle deleting a todo item

// handle deleting a project

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