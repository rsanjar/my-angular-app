import { Component, input } from '@angular/core';
import { UserModel } from '../core/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails {
  currentUser = input.required<UserModel | null>();
}
