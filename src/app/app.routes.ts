import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./projects/project-list/project-list.component').then((m) => m.ProjectListComponent),
  },
  {
    path: 'projects/new',
    loadComponent: () =>
      import('./projects/project-form/project-form.component').then((m) => m.ProjectFormComponent),
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./tasks/task-dashboard/task-dashboard.component').then((m) => m.TaskDashboardComponent,
      ),
  },
];
