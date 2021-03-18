import { Todo, TodoList } from './classes';
import { createTodo } from './js/createTodo';
import { todoCountContent } from './js/htmlReferences';

import './styles.css';

export const todoList = new TodoList();

todoCountContent.children[0].innerHTML = todoList.remainingTodos();

todoList.todos.forEach(createTodo);