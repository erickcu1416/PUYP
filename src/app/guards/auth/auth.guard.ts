import { UserService } from './../../services/user/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  user = '';
  constructor(
    public _userService: UserService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return new Promise((resolve, reject) => {
      this._userService.getCurrentUser()
        .then(user => {
          console.log("No error");
          return resolve(true);
        }, err => {
          console.log('Error en el guard');
          return resolve(false);
        });
    });
  }

  
}
