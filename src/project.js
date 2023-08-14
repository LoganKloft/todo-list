export class Project {
    todos = []

    constructor(name) {
        this.name = name;
    }

    add(todo) {
        this.todos.push(todo);
    }

    remove(id) {
        const index = this.#findIndex(id);

        // if todo found, remove it
        if (index !== -1)
        {
            this.todos.splice(index, 1);
        }
    }

    get(id) {
        return this.todos.find((todo) => {
            return todo.id === id;
        }, id)
    }

    has(id) {
        return this.todos.findIndex((todo) => {
            return todo.id === id
        }, id) !== -1;
    }

    #findIndex(id) {
        // find todo index in the todos list
        return this.todos.findIndex((todo) => {
            return todo.id === id;
        }, id);
    }
}