import { Project } from './project';

export class ProjectManager {
    projects = [];

    AddTodo(todo)
    {
        const project_name = todo.project_name;

        if (!this.#HasProject(project_name))
        {
            const project = new Project(project_name);
            this.AddProject(project);
        }
        
        this.#GetProject(project_name).add(todo);
    }

    RemoveTodo(id)
    {
        for (let project of this.projects)
        {
            if (project.has(id)) {
                project.remove(id);
            }
        }
    }

    AddProject(project)
    {
        if (!this.#HasProject(project.name))
        {
            this.projects.push(project);
        }
    }

    RemoveProject(name)
    {
        const index = this.#GetProjectIndex(name);
        if (index !== -1)
        {
            this.projects.splice(index, 1);
        }
    }

    #GetProjectIndex(name)
    {
        return this.projects.findIndex((project) => {
            return project.name === name;
        }, name);
    }

    #GetProject(name)
    {
        return this.projects.find((project) => {
            return project.name === name;
        }, name);
    }

    #HasProject(name)
    {
        return this.projects.findIndex((project) => {
            return project.name === name;
        }, name) !== -1;
    }

    GetStringObject()
    {
        let obj = {};
        let projects = [];

        for (let project of this.projects)
        {
            projects.push(project.GetStringObject());
        }

        obj.projects = projects;
        return obj;
    }
}