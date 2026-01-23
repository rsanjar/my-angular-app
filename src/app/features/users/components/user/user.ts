import { Component, input, output } from '@angular/core';
import { UserModel } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {
  user = input.required<UserModel>();
  userSelected = output<UserModel>();
  selected = input<boolean>();

  onUserClick() {
    this.userSelected.emit(this.user());
  }
}
