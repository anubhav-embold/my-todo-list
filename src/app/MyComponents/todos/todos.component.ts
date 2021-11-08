import { transition, trigger, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
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
  
  // PARENT COMPONENT : todos array is defined here
  
  localItem: string;
  todos:Todo[]; // a "todos" array of type "Todo"
  
  constructor() { 
    this.localItem = localStorage.getItem("todos")!;
    if(this.localItem == null){
      this.todos = [];
    }
    else{
      this.todos = JSON.parse(this.localItem);
    }
  }

  ngOnInit(): void {
  }

  deleteTodo(todo: Todo){
    console.log(todo);
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  addTodo(todo: Todo){
    console.log(todo);
    this.todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  toggleTodo(todo: Todo){
    const index = this.todos.indexOf(todo);
    this.todos[index].active = !this.todos[index].active;
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
}
