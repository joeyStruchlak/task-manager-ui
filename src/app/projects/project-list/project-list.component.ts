// 1. Import what we need
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';

// 2. @Component decorator — tells Angular this is a component
//    and gives it its HTML template and CSS styles
@Component({
  selector: 'app-project-list',        // used as <app-project-list /> in templates
  templateUrl: './project-list.component.html',  // the UI
  styleUrl: './project-list.component.scss'      // the styles
})

// 3. The class — PascalCase, always ends in Component
export class ProjectListComponent {

  // 4. Inject the service — Angular hands us the singleton instance
  private readonly projectService = inject(ProjectService);

  // 5. Call the service, convert Observable → Signal
  //    projects() in the template returns the current array value
  //    initialValue: [] means "start empty while HTTP call is in flight"
  readonly projects = toSignal(this.projectService.getAll(), {
    initialValue: [] as Project[]  // typed as Project[] so TypeScript knows the shape
  });

}