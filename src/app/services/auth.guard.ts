import { auth } from 'firebase/app';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
/**
 *
 *
 * @export AuthGuard เป็น service เพื่อกันไม่ให้ user ที่ไม่ใช่ admin เข้าถึง
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root' // ADDED providedIn root here.
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  /**
   * ฟังก์ชั่นเพื่อดูสถานะผู้ใช้ ถ้ายังไม่ได้ login และไม่ใช่ admin จะไปที่หน้า login
   *
   * @param {ActivatedRouteSnapshot}
   * @param {RouterStateSnapshot}
   * @returns {Observable<boolean>} true คือ login แล้ว false คือ ยังไม่ได้ login
   * @memberof AuthGuard
   *
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.user$.pipe(
      take(1),
      map(user => !!user), // <-- map to boolean
      tap(loggedIn => {
        if (!loggedIn) {
          //console.log('access denied');
          this.router.navigate(['/']);
        }
      })
    );
  }
}
