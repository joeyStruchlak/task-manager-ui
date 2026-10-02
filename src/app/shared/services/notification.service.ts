import { Injectable, signal } from '@angular/core';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly notification = signal<Notification | null>(null);

  success(message: string): void {
    this.notification.set({ message, type: 'success' });
    setTimeout(() => this.notification.set(null), 3000);
  }

  error(message: string): void {
    this.notification.set({ message, type: 'error' });
    setTimeout(() => this.notification.set(null), 3000);
  }
}