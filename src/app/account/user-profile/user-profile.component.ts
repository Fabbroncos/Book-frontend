import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { User } from "../user.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  user: User;

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.user.value
  }
}