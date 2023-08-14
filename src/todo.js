import { v4 as uuidv4 } from 'uuid';

export class Todo {
    // (string) title - the title of the todo item
    // (string) date - the finishing date of the todo item
    // (string) priority - low | medium | high
    // (string) description - the description of the todo item
    // (string) project - the project name the todo item belongs to
    constructor(title, date, description, priority, project_name = 'default') {
        this.title = title;
        this.date = date;
        this.description = description;
        this.priority = priority;
        this.project_name = project_name;
        this.id = uuidv4();
    }
}