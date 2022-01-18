import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { environment } from "src/environments/environment.prod";

export interface Provinces{
  id: number,
  name: string,
  code: string
}

@Injectable({
  providedIn: "root"
})
export class ProvincesResolverService implements Resolve<Provinces[]>{
  constructor(private http: HttpClient, private authService: AuthService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.http.get(
      `${environment.apiUrl}/api/v1/provinces`
    ).pipe(
      map(
        (resData: {message: string, data: Provinces[]}) => {
          return resData.data
        }
      )
    )
  }

}