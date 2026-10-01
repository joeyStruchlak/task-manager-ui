// Mirrors ProjectDto.cs — TaskManager.Application/DTOs/ProjectDto.cs
export interface Project {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
}

// Mirrors CreateProjectCommand.cs — what we POST to /api/projects
export interface CreateProjectRequest {
  name: string;
  description: string | null;
}