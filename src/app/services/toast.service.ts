import { Injectable } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  removing: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: Toast[] = [];
  private counter = 0;

  show(
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info',
    duration = 3500
  ) {
    const id = ++this.counter;
    this.toasts.push({ id, message, type, removing: false });
    setTimeout(() => this.dismiss(id), duration);
  }

  dismiss(id: number) {
    const toast = this.toasts.find((t) => t.id === id);
    if (toast && !toast.removing) {
      toast.removing = true;
      setTimeout(() => {
        this.toasts = this.toasts.filter((t) => t.id !== id);
      }, 350);
    }
  }
}
