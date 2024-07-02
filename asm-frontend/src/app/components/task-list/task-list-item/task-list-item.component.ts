import {Component, inject, Input, OnInit} from '@angular/core';
import {TasksService} from "../services/tasks.service";
import {Task} from "../interfaces/TaskInterface";

@Component({
  selector: 'app-task-list-item',
  standalone: true,
  imports: [],
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.less'
})
export class TaskListItemComponent {

  @Input()
  task: Task | undefined;

  todoService = inject(TasksService);

  isInputDisabled: boolean = true;

  toggleTodo() {
    if (!this.task) {
      return;
    }
    this.todoService.toggleTodo(this.task.id);
  }

  editEntry(): void {
    this.isInputDisabled = !this.isInputDisabled;
  }

  changeDescription(event: any) {
    if (!event || !this.task) {
      return;
    }
    this.todoService.updateTask(this.task?.id, event.target.value);
    this.isInputDisabled = !this.isInputDisabled;
  }
}
