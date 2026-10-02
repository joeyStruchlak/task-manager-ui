import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
//   styleUrl: './project-form.component.scss',
  imports: [ReactiveFormsModule]
})
export class ProjectFormComponent {
  private readonly projectService = inject(ProjectService);

  // Signal-based UI state
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  // Reactive form — mirrors CreateProjectCommand exactly
  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(200)
      ]
    }),
    description: new FormControl<string | null>(null)
  });

  submit(): void {
    if (this.form.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.projectService.create(this.form.getRawValue()).subscribe({
      next: (id) => {
        console.log('Project created with ID:', id);
        this.form.reset();
        this.isLoading.set(false);
      },
      error: (problem) => {
        this.errorMessage.set(problem.detail ?? 'Something went wrong.');
        this.isLoading.set(false);
      }
    });
  }
}