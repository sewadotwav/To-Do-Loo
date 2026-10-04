import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<ToastMessage[]>([]);

  show(message: string): void {
    const id = crypto.randomUUID();
    this.toasts.update(list => [...list, { id, message }]);

    setTimeout(() => {
      this.toasts.update(list => list.filter(t => t.id !== id));
    }, 2500);
  }
}