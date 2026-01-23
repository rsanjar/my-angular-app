import { Injectable, signal } from '@angular/core';
import { UserTaskModel } from '../models/user-task.model';
import { DummyUserTasks } from '../data/dummy-tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksSignal = signal<UserTaskModel[]>([]);
  private readonly localStorageKey = 'userTasks';

  constructor() {
    const storedTasks = localStorage.getItem(this.localStorageKey);
    const initializedTasks = storedTasks ? JSON.parse(storedTasks) : DummyUserTasks;
    this.tasksSignal.set(initializedTasks);

    if (!storedTasks) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(initializedTasks));
    }
  }

  // Expose tasks as readonly signal
  tasks = this.tasksSignal.asReadonly();

  getAllByUser(userID: number, isCompleted?: boolean): UserTaskModel[] {
    return this.tasksSignal().filter(
      (task) =>
        task.userID === userID && (isCompleted === undefined || task.isCompleted === isCompleted),
    );
  }

  addTask(newTask: UserTaskModel) {
    this.tasksSignal.update((tasks) => [...tasks, newTask]);
    this.persistTasks();
  }

  updateTask(updatedTask: UserTaskModel) {
    this.tasksSignal.update((taskList) =>
      taskList.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
    this.persistTasks();
  }

  completeTask(taskId: number) {
    this.tasksSignal.update((taskList) =>
      taskList.map((task) =>
        task.id === taskId ? { ...task, isCompleted: true, completedDate: new Date() } : task,
      ),
    );
    this.persistTasks();
  }

  removeTask(taskId: number) {
    this.tasksSignal.update((taskList) => taskList.filter((task) => task.id !== taskId));
    this.persistTasks();
  }

  private persistTasks() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasksSignal()));
  }
}
