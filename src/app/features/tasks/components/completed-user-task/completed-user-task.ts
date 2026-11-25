import { UserTaskModel } from '../../../../core/models/user-task.model';
import { TaskCard } from '../task-card/task-card';
import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-completed-user-task',
  imports: [TaskCard],
  templateUrl: './completed-user-task.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './completed-user-task.scss',
})
export class CompletedUserTask {
  completedTaskList = input.required<UserTaskModel[]>();
}
