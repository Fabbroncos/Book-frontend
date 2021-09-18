import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Book } from "./book.model";

export interface Genre{
  id: number,
  name: string,
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  fetchGenre() {
    return this.http.get(
      "http://65.108.49.43:3000/api/v1/genres",
      {
        headers: {
          "Authorization":  this.authService.user.value.token
        }
      }
    )
  }
}