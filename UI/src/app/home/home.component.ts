import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatSnackBar,
  MatTableDataSource,
} from '@angular/material';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserDataResponse } from '../models/UserData.model';
import { PaginationService } from '../services/pagination.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['firstname', 'lastname', 'email'];
  userDataSource: MatTableDataSource<object>;
  loading: boolean;
  isError: boolean;
  searchString: string;

  pageProperties = {
    pageSize: 20,
    pageIndex: 0,
    pageLength: 0,
    previousPageIndex: 0,
  };

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private paginationService: PaginationService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userService.setUser();
    this.getPageInfo();
  }

  getPageInfo(pageNumber = 1) {
    this.loading = true;
    this.paginationService
      .getPageDetails(pageNumber, this.pageProperties.pageSize)
      .pipe(catchError(this.handleError))
      .subscribe((data: UserDataResponse) => {
        if (data.length) {
          this.userDataSource = new MatTableDataSource(data.userInfo);
          this.pageProperties.pageLength = data.length;
          this.pageProperties.pageIndex = this.paginator.pageIndex;
          this.loading = false;
          this.isError = false;
        }
      });
  }

  getPageDetails(event) {
    this.searchString = '';
    if (this.isError) {
      this.paginator.disabled = true;
    } else {
      this.pageProperties.previousPageIndex = event.previousPageIndex;
      this.getPageInfo(this.paginator.pageIndex + 1);
    }
  }

  handleError = (err: string) => {
    this.loading = false;
    this.isError = true;
    this.paginator.pageIndex = this.pageProperties.previousPageIndex;
    this.paginator.disabled = true;
    this.openSnackBar(err, 'Error');
    return of([]);
  }

  // display snack bar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  applyFilter() {
    this.userDataSource.filter = this.searchString.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.userService.clearUser();
  }
}
