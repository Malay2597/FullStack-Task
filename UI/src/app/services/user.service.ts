import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/User.model';
import { UserCredentials } from '../models/UserCredentials.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  userExists = new BehaviorSubject<boolean>(false);

  login(loginCredentials: UserCredentials): Observable<object> {
    return this.http
      .post(`${environment.apiUrl}/login`, loginCredentials)
      .pipe(catchError(this.handleError));
  }

  register(userInfo: User): Observable<object> {
    return this.http
      .post(`${environment.apiUrl}/register`, userInfo)
      .pipe(catchError(this.handleError));
  }

  setUser() {
    this.userExists.next(true);
  }

  clearUser() {
    this.userExists.next(false);
    localStorage.clear();
  }

  // error handling
  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error.message && typeof err.error.message === 'string') {
      errorMessage = err.error.message;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
