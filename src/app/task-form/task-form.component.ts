import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  constructor(
    private taskService: TaskService,
    private toastService: ToastService
  ) {}

  onAdd(event: Event, input: HTMLInputElement): void {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;

    this.taskService.addTask(value);
    this.toastService.show('Task added');
    input.value = '';
    input.focus();
  }
}