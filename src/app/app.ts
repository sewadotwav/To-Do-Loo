import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, TaskFormComponent, TaskListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  showSplash = signal(true);
  toasts;

  constructor(private toastService: ToastService) {
    this.toasts = this.toastService.toasts;
  }

  ngOnInit(): void {
    setTimeout(() => this.showSplash.set(false), 1100);
  }
}