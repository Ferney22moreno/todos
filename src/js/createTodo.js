import { Todo } from '../classes';
import { todoList } from '../index';
import {
    todoListContainer,
    inputTextTodo,
    buttonRemoveCompletedTodos,
    ulFilters,
    anchorFilter,
    todoCountContent,
} from './htmlReferences';

export const createTodo = ({task, id, completed}) => {
    const markUpTodo = `
    <li ${completed ? 'class="completed"' : ''} data-id='${id}'>
        <div class="view">
            <input class="toggle" type="checkbox" ${completed ? 'checked' : ''}>
            <label>${task}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement('div');
    div.innerHTML = markUpTodo;

    todoListContainer.append(div.firstElementChild);

    return div.firstElementChild;
}

inputTextTodo.addEventListener('keyup', ({ keyCode }) => {
    if (keyCode === 13 && inputTextTodo.value.length > 0) {
        const todo = new Todo(inputTextTodo.value);
        todoList.newTodo(todo);
        todoCountContent.children[0].innerHTML = todoList.remainingTodos();
        createTodo(todo);

        inputTextTodo.value = '';
    }
});

todoListContainer.addEventListener('click', (event) => {
    const targetElementName = event.target.localName;
    const targetTodoElement = event.target.parentElement.parentElement;
    const todoId = targetTodoElement.getAttribute('data-id');

    if (targetElementName.includes('input')) {
        todoList.toggleTodo(todoId);
        targetTodoElement.classList.toggle('completed')
    }

    if (targetElementName.includes('button')) {
        todoList.removeTodo(todoId);
        targetTodoElement.remove();
    }

    todoCountContent.children[0].innerHTML = todoList.remainingTodos();
});

buttonRemoveCompletedTodos.addEventListener('click', () => {
    const allCompletedTodos = document.querySelectorAll('.completed');
    if (todoList.todos.length > 0 && allCompletedTodos.length > 0) {
        todoList.removeCompletedTodos();
        allCompletedTodos.forEach(todo => todo.remove());
    }
});

ulFilters.addEventListener('click', event => {
    const textFilter = event.target.text;

    if (!textFilter) return;

    anchorFilter.forEach(filter => filter.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const todo of todoListContainer.children) {
        todo.classList.remove('hidden');
        const todoCompleted = todo.classList.contains('completed');

        switch (textFilter) {
            case 'Completados':
                if (!todoCompleted) {
                    todo.classList.add('hidden');
                }
                break;
            case 'Pendientes':
                if (todoCompleted) {
                    todo.classList.add('hidden');
                }
            break;
        }
    }
})

