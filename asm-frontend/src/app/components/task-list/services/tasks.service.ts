import {Injectable, signal} from '@angular/core';
import {Task} from "../interfaces/TaskInterface";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {RemoteTodo} from "../interfaces/RemoteTodoInterface";


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  todoSig = signal<Task[]>([]);

  constructor(private httpService: HttpClient) {
    this.preFillTodoList();
  }

  preFillTodoList = (): void => {
    this.httpService.get<RemoteTodo[]>(`https://dummyjson.com/todos/random/10`)
      .pipe(map((res: RemoteTodo[]) => res))
      .subscribe(
        {
          next: (data) => {
            data.forEach(todo => {
              if (!todo) {
                return;
              }

              const newTodo: Task = {
                id: todo.id,
                description: todo.todo,
                isCompleted: todo.completed,
                userId: todo.userId
              }

              this.todoSig.update(todos => [...todos, newTodo])
            })
          },
          error: (err) => {
            console.log(err);
          }
        }
      );
  }

  addTodo = (description: string): void => {
    const newTodo: Task = {
      id: this.generateTaskId(),
      description: description,
      isCompleted: false,
      userId: 999
    }
    this.todoSig.update(todos => [...todos, newTodo])
  }

  updateTask = (id: number, description: string): void => {
    this.todoSig.update(todos => todos.map(todo => todo.id === id ? {...todo, description} : todo));
  }

  toggleTodo = (id: number): void => {
    this.todoSig.update(todos => todos.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo));
  }

  private generateTaskId = (): number => {
    return Math.random();
  }
}
