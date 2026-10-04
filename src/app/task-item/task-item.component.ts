import { Component, Input, signal } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;

  isEditing = signal(false);
  isConfirmingDelete = signal(false);

  constructor(
    private taskService: TaskService,
    private toastService: ToastService
  ) {}

  toggleComplete(): void {
    this.taskService.toggleComplete(this.task.id);
  }

  startEdit(): void {
    this.isEditing.set(true);
  }

  cancelEdit(): void {
    this.isEditing.set(false);
  }

  saveEdit(input: HTMLInputElement): void {
    const value = input.value.trim();
    if (!value) return;

    this.taskService.updateTask(this.task.id, value);
    this.isEditing.set(false);
    this.toastService.show('Task updated');
  }

  askDelete(): void {
    this.isConfirmingDelete.set(true);
  }

  cancelDelete(): void {
    this.isConfirmingDelete.set(false);
  }

  confirmDelete(): void {
    this.taskService.deleteTask(this.task.id);
    this.isConfirmingDelete.set(false);
    this.toastService.show('Task deleted');
  }
}