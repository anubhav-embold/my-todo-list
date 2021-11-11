import { transition, trigger, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TodoService } from 'app/services/todo.service';
import {Todo} from "../../Todo"

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(200, style( { opacity: 1, transform: 'translateY(0px)'} ))
      ]),

      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(30px)' }),
        animate(200, style( { opacity: 0, transform: 'translateY(0px)'} ))
      ])
    ])
  ]
})
export class TodosComponent implements OnInit {
  
  localItem: string;
  
  constructor(public todoService: TodoService) { 
    
    this.localItem = localStorage.getItem("todos")!;
    
    if (this.localItem == null) {
      this.todoService.todos = [];
    }
    else {
      this.todoService.todos = JSON.parse(this.localItem);
    }

  }

  ngOnInit(): void {
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo);
    this.remainingTodos();
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
    this.remainingTodos();
  }

  toggleTodo(todo: Todo) {
    this.todoService.toggleTodo(todo);
    this.remainingTodos();
  }

  remainingTodos() {
    return this.todoService.remainingTodos();
  }
}
