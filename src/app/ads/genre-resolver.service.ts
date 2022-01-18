import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Genre } from "./ad.model";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class GenreResolverService implements Resolve<Genre[]>{
  constructor(private http: HttpClient, private authService: AuthService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.http.get(
      `${environment.apiUrl}/api/v1/genres`
    )
    .pipe(
      map((genresData: {message: string, data: []}) => {
        return genresData.data
      })
    );
  }

}