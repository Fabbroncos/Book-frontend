import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { User } from "src/app/account/user.model";
import { AuthService } from "src/app/auth/auth.service";
import { Book } from "../book.model";
import { BookService } from "../book.service";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html'
})
export class BookDetailComponent implements OnInit{
  id: number;
  book: Book;

  userId: number;

  constructor(private route: ActivatedRoute, private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.userId = this.authService.user.value.id;
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['book-id'];
        
        this.http.get(
          `http://159.89.30.229:3000/api/v1/ads/${this.id}`
        ).subscribe(
          (ads: {message: string, data: Book}) => {
            console.log(ads);
            this.book = ads.data
            console.log(this.book);
            
          }
        )
        
      }
    )
  }

  onDelete() {
    this.http.delete(
      `http://159.89.30.229:3000/api/v1/ads/${this.id}`
    ).subscribe(
      (resData) => {
        console.log(resData);
      }
    )
  }
}