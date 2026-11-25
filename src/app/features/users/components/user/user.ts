import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { UserModel } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
