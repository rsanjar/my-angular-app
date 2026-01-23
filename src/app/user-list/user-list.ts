import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModel } from '../core/models/user.model';
import { User } from '../user/user';
import { UserDetails } from '../user-details/user-details';
import { UserTasks } from '../user-tasks/user-tasks';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-user-list',
  imports: [User, CommonModule, UserDetails, UserTasks],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  users = signal<UserModel[]>([]);
  selectedUser = signal<UserModel | null>(null);
  private userService = inject(UserService);

  constructor() {
    this.users.set(this.initializeUsers(this.userService.users()));
  }

  onUserSelected(user: UserModel): void {
    this.selectedUser.set(user);
  }

  isSelectedUser(user: UserModel): boolean {
    return this.selectedUser()?.id === user.id;
  }

  private initializeUsers(users: UserModel[]): UserModel[] {
    return users.map((user) => ({
      ...user,
      fullName: `${user.firstName}${user.lastName ? ' ' + user.lastName : ''}`,
    }));
  }
}
