import { Component, output, input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { type UserTaskModel } from '../../../../core/models/user-task.model';
import { TaskService } from '../../../../core/services/task.service';

@Component({
  selector: 'app-add-task-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-task-modal.html',
  styleUrl: './add-task-modal.scss',
})
export class AddTaskModal {
  closed = output<void>();
  userID = input<number | null>();
  //taskAdded = output<UserTaskModel>();
  private taskService = inject(TaskService);

  taskForm = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    dueDate: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    priority: new FormControl<string>('medium', {
      nonNullable: true,
    }),
    status: new FormControl<string>('todo', {
      nonNullable: true,
    }),
  });

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.getRawValue();
      const newTask: UserTaskModel = {
        ...formValue,
        id: 0, // Will be assigned by service
        userID: this.userID() ?? 0,
        isCompleted: false,
      };
      this.taskService.addTask(newTask);
      //this.taskAdded.emit(newTask);
      this.onClose();
    }
  }

  onClose(): void {
    this.closed.emit();
  }
}
