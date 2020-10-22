import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';
import { User } from '../models/User.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  loading: boolean;
  userInfo: User = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  };
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private router: Router
  ) {}

  register() {
    // check for email and password validation
    if (this.emailFormControl.valid && this.userInfo.password) {
      this.userService
        .register(this.userInfo)
        .pipe(catchError(this.handleError))
        .subscribe((res) => {
          this.openSnackBar('Registration successful', '');
          this.router.navigate(['/login']);
        });
    } else {
      this.openSnackBar('Please fill required fields', 'error');
    }
  }

  // handle error from servers
  handleError = (err: string) => {
    this.openSnackBar(err, 'Error');
    return throwError(err);
  }

  // show snack bar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
