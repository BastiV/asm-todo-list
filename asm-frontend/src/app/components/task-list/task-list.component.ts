import {Component, inject, OnInit} from '@angular/core';
import {TaskListItemComponent} from "./task-list-item/task-list-item.component";
import {TasksService} from "./services/tasks.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    TaskListItemComponent,
    ReactiveFormsModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.less'
})
export class TaskListComponent implements OnInit {

  isClosedTodosSectionVisible: boolean = true;

  todoFormGroup = new FormGroup(
    {
      todoDescription: new FormControl('', [Validators.required])
    }
  )

  todoService = inject(TasksService);

  ngOnInit(): void {
    // const minOneCompletedTask = this.todoService.todoSig().find(task => task.isCompleted);
    // this.isClosedTodosSectionVisible = !!minOneCompletedTask;
  }

  addTodo(): void {
    if (!this.todoFormGroup.valid) {
      return;
    }

    if(!this.todoFormGroup?.controls.todoDescription.value) {
      return;
    }

    this.todoService.addTodo(this.todoFormGroup?.controls.todoDescription.value);
    this.todoFormGroup.reset();
  }
}
