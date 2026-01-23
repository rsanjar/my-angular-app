import { Component, input, inject } from '@angular/core';
import { UserTaskModel } from '../core/models/user-task.model';
import { TaskCard } from '../shared/task-card/task-card';
import { TaskService } from '../core/services/task.service';

@Component({
  selector: 'app-user-task',
  imports: [TaskCard],
  templateUrl: './user-task.html',
  styleUrl: './user-task.scss',
})
export class UserTask {
  userTask = input.required<UserTaskModel>();
  private taskService = inject(TaskService);

  markAsCompleted() {
    this.taskService.completeTask(this.userTask().id);
  }
}
