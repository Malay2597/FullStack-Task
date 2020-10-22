import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}
  // this method is used to protect routes for logged in users
  canActivate(): boolean {
    if (!localStorage.getItem('userEmail')) {
      // we can also redirect to error page if needed
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
