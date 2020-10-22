import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';
import { UserCredentials } from '../models/UserCredentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials: UserCredentials = {
    email: '',
    password: '',
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // implement login
  login() {
    this.userService
      .login(this.credentials)
      .pipe(catchError(this.handleError))
      .subscribe((res) => {
        localStorage.setItem('userEmail', this.credentials.email);
        this.router.navigate(['/home']);
      });
  }

  // handle error from server
  handleError = (err: string) => {
    this.openSnackBar(err, 'Error');
    return throwError(err);
  }

  // display snack bar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
