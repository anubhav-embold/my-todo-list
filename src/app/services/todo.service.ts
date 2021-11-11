import { Injectable } from '@angular/core';
import { Todo } from "../Todo"

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[];
  count: number;

  constructor() { }

  addTodo(todo: Todo) {
    // console.log(todo);
    this.todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
  
  deleteTodo(todo: Todo) {
    // console.log(todo);
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  toggleTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos[index].active = !this.todos[index].active;
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  remainingTodos(): number {
    this.count = 0;
    this.todos.forEach((todo) => {
      if (todo.active == true) {
        this.count++;
      }
    })
    return this.count;
  }
}
