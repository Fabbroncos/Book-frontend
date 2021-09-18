import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit{
  // isUser = true;
  id = "0";

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.isUser = !!params;
    //   } 
    // )
  }
}