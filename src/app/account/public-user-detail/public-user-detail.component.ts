import { Component, OnInit } from "@angular/core";
import { Params } from "@angular/router";

@Component({
  selector: 'app-public-user-detail',
  templateUrl: 'public-user-detail.component.html'
})

export class PublicUserDetail implements OnInit{

  constructor() {}

  params: Params = {user_id: '24'}
  ngOnInit() {
    
  }
}