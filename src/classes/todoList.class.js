import { Todo } from './todo.class';

export class TodoList {

    constructor() {
        this.getFromLocalStorage();
    }

    newTodo(todo) {
        this.todos.push(todo);
        this.saveToLocalStorage();
    }

    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveToLocalStorage();
    }

    toggleTodo(id) {
        for (const todo of this.todos) {
            console.log(id, todo.id);
            if (todo.id === id) {
                todo.completed = !todo.completed;
                this.saveToLocalStorage();
                break;
            }
        }
    }

    removeCompletedTodos() {
        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    getFromLocalStorage() {
        if (localStorage.getItem('todos')) {
            this.todos = JSON.parse(localStorage.getItem('todos'));
        } else {
            this.todos = [];
        }

        this.todos = this.todos.map( Todo.fromJson );
    }

    remainingTodos() {
        return this.todos.filter(todo => !todo.completed).length;
    }
}