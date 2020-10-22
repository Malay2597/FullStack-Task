import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'UI';
  userExists = false;
  userEmail: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.userExists.subscribe((value) => {
      if (value) {
        this.userExists = true;
        this.userEmail = localStorage.getItem('userEmail');
      } else {
        this.userEmail = null;
        this.userExists = false;
      }
    });
  }

  logout() {
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }
}
