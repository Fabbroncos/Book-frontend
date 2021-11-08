import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Genre } from "./ad.model";

@Injectable({
  providedIn: "root"
})
export class GenreResolverService implements Resolve<Genre[]>{
  constructor(private http: HttpClient, private authService: AuthService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.http.get(
      `${this.authService.url}/api/v1/genres`,
      {
        headers: {
          "Authorization":  this.authService.user.value.token
        }
      }
    )
    .pipe(
      map((genresData: {message: string, data: []}) => {
        return genresData.data
      })
    );
  }

}