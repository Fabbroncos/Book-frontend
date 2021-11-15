import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { User } from "../user.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit{
  id: number;
  user: User;

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    console.log(this.authService.user.value);
    
    this.user = this.authService.user.value
  }
}