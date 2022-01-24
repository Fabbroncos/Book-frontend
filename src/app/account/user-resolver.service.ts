import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { map } from "rxjs/internal/operators/map";
import { AuthService } from "src/app/auth/auth.service";
import { environment } from "src/environments/environment.prod";
import { User } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<void> {
  constructor(private http: HttpClient, private authService: AuthService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(this.authService.user.value);
    
    this.http.get<any>(
      `${environment.apiUrl}/api/v1/provinces/${this.authService.user.value.comune.province_id}`
    ).pipe(
      map(provinceData => {
        this.authService.user.value.province = provinceData.data.name
        console.log(this.authService.user.value);
      })
    )
  }
}