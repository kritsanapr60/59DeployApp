import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, take, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.user$.pipe(
      take(1),
      map(user => !!user), // <-- map to boolean
      switchMap((loggedIn) => loggedIn ? this.auth.admin$ : of(false)),
      tap((admin) => {
        if (!admin) {
          //console.log('access denied');
          this.router.navigate(['/']);
        }
      })
    );
  }
}
