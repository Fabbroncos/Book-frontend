import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { BookService, Genre } from "./book.service";

@Injectable({
  providedIn: "root"
})
export class GenreResolverService implements Resolve<Genre[]>{
  constructor(private http: HttpClient, private bookService: BookService, private authService: AuthService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.bookService.fetchGenre()
      .pipe(
        map((genresData: {message: string, data: []}) => {
          return genresData.data
        })
      );
  }

}