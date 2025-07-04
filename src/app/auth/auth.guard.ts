import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot,
  ): Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.userData.pipe(
      take(1),
      map((user) => {
        const isAuth = !!user
        if (isAuth) {
          return true
        } else {
          return this.router.createUrlTree(['/auth/login'])
        }
      }),
    )
  }
}
