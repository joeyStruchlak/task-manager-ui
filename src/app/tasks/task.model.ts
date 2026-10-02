// Mirrors TaskDto.cs — TaskManager.Application/DTOs/TaskDto.cs
export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
  completedAt: string | null;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignedTo: string | null;
  dueDate: string | null;
}

// Mirrors CreateTaskCommand — what we POST to /api/tasks
export interface CreateTaskRequest {
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignedTo: string | null;
  dueDate: string | null;
}