import { Component, Input, OnInit } from "@angular/core";
import { Book } from "../book.model";

@Component({
  selector: 'app-book-list-item-component',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent implements OnInit{
  @Input('book') book: Book

  ngOnInit() {
    this.book["type"] = "vendo";
    this.book["price"] = "15.99€";
    
  }
}