export interface UserTaskModel {
  id: number;
  title: string;
  description?: string;
  userID: number; // User ID
  dueDate?: string; // ISO date
  isCompleted: boolean;
  completedDate?: Date; // ISO date
}
