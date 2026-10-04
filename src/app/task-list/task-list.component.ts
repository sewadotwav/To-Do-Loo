import { Component, computed, Signal } from '@angular/core';
import { TaskService } from '../task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  tasks: Signal<Task[]>;
  ongoingTasks: Signal<Task[]>;
  completedTasks: Signal<Task[]>;

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.tasks;
    this.ongoingTasks = computed(() => this.tasks().filter(t => !t.completed));
    this.completedTasks = computed(() => this.tasks().filter(t => t.completed));
  }
}