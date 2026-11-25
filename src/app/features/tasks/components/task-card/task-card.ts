import { UserTaskModel } from '../../../../core/models/user-task.model';
import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { NgClass, TitleCasePipe } from '@angular/common';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { TaskDatePipe } from '../../../../shared/pipes/task-date.pipe';

@Component({
  selector: 'app-task-card',
  imports: [NgClass, TitleCasePipe, TruncatePipe, TaskDatePipe],
  templateUrl: './task-card.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './task-card.scss',
})
export class TaskCard {
  task = input.required<UserTaskModel>();
}
