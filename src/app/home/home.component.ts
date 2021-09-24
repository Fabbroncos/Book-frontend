import { Component, OnInit } from "@angular/core";
import { Ad } from "../ads/ad.model";

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
  books: Ad[] = [];

  constructor() {}

  ngOnInit() {
  }

}