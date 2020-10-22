import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserDataResponse } from '../models/UserData.model';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor(private http: HttpClient) {}

  getPageDetails(pageNumber = 1, pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return this.http
      .get<UserDataResponse>(`${environment.apiUrl}/pageInfo`, { params })
      .pipe(catchError(this.handleError));
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
