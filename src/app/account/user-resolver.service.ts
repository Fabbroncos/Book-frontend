import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { map } from "rxjs/internal/operators/map";
import { AuthService } from "src/app/auth/auth.service";
import { User } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<User> {
  constructor(private http: HttpClient, private authService: AuthService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.loadUser().pipe(
      map(userValue => {
        return this.authService.user.value
      })
    );
  }
}