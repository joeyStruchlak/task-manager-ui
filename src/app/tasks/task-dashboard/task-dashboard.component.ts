import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { TaskService } from '../task.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Task } from '../task.model';
import { FilterStatus } from './task-dashboard.model';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrl: './task-dashboard.component.scss',
  imports: [DatePipe]
})
export class TaskDashboardComponent {
  private readonly taskService = inject(TaskService);
  private readonly notificationService = inject(NotificationService);
  readonly userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // raw tasks from API
  private readonly allTasks = toSignal(this.taskService.getAll(), {
    initialValue: [] as Task[]
  });

  // filter state
  readonly filter = signal<FilterStatus>('all');

  // computed — recalculates automatically when allTasks or filter changes
  readonly filteredTasks = computed(() => {
    const tasks = this.allTasks();
    switch (this.filter()) {
      case 'active':    return tasks.filter(t => !t.isCompleted);
      case 'completed': return tasks.filter(t => t.isCompleted);
      default:          return tasks;
    }
  });

  // summary signals
  readonly totalCount = computed(() => this.allTasks().length);
  readonly completedCount = computed(() => 
    this.allTasks().filter(t => t.isCompleted).length
  );

  // UI state
  readonly isCompleting = signal<number | null>(null);

  setFilter(status: FilterStatus): void {
    this.filter.set(status);
  }

  markComplete(taskId: number): void {
    this.isCompleting.set(taskId);

    this.taskService.complete(taskId).subscribe({
      next: () => {
        this.notificationService.success('Task marked as complete');
        this.isCompleting.set(null);
      },
      error: (problem: any) => {
        this.notificationService.error(problem.detail ?? 'Failed to complete task');
        this.isCompleting.set(null);
      }
    });
  }
}