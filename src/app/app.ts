import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { UserList } from './features/users/components/user-list/user-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, UserList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
