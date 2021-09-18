import { Component, OnInit } from "@angular/core";
import { Book } from "../book/book.model";
import { BookService } from "../book/book.service";

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
  }

}