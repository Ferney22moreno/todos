export class Todo {

    static fromJson({ task, id, completed, created }) {
        const temporaryTodo = new Todo(task);

        temporaryTodo.id = id;
        temporaryTodo.completed = completed;
        temporaryTodo.created = created;

        return temporaryTodo;
    }

    constructor(task) {
        this.task = task;
        this.id = Math.floor((1 + Math.random()) * 0x10000).toString(16);
        this.completed = false;
        this.created = new Date();
    }

    printClass() {
        console.log(`${this.task} - ${this.id}`);
    }

}