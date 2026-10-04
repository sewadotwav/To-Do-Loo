import { Injectable, signal } from '@angular/core';
import { Task } from './task.model';

const STORAGE_KEY = 'todo-loo-tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
  tasks = signal<Task[]>(this.loadTasks());

  private loadTasks(): Task[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Task[]) : [];
    } catch {
      return [];
    }
  }

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  addTask(title: string): void {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: Date.now(),
    };
    const updated = [...this.tasks(), newTask];
    this.tasks.set(updated);
    this.saveTasks(updated);
  }

  updateTask(id: string, newTitle: string): void {
    const updated = this.tasks().map(t =>
      t.id === id ? { ...t, title: newTitle } : t
    );
    this.tasks.set(updated);
    this.saveTasks(updated);
  }

  deleteTask(id: string): void {
    const updated = this.tasks().filter(t => t.id !== id);
    this.tasks.set(updated);
    this.saveTasks(updated);
  }

  toggleComplete(id: string): void {
    const updated = this.tasks().map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.tasks.set(updated);
    this.saveTasks(updated);
  }
}