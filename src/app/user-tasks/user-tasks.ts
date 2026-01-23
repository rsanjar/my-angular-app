import { TaskService } from './../core/services/task.service';
import { Component, input, computed, signal, inject } from '@angular/core';
import { UserTaskModel } from '../core/models/user-task.model';
import { UserTask } from '../user-task/user-task';
import { AddTaskModal } from '../features/components/add-task-modal/add-task-modal';
import { CompletedUserTask } from '../completed-user-task/completed-user-task';

@Component({
  selector: 'app-user-tasks',
  imports: [UserTask, AddTaskModal, CompletedUserTask],
  templateUrl: './user-tasks.html',
  styleUrl: './user-tasks.scss',
})
export class UserTasks {
  showAddTaskModal = false;
  userID = input<number | null>();
  tasks = signal<UserTaskModel[]>([]);
  private taskService = inject(TaskService);

  constructor() {
    this.tasks.set(this.taskService.tasks());
  }

  userTasks = computed(() => this.taskService.getAllByUser(this.userID()!, false));
  completedTasks = computed(() => this.taskService.getAllByUser(this.userID()!, true));

  toggleAddTaskModal() {
    this.showAddTaskModal = !this.showAddTaskModal;
  }
}
