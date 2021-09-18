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
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['username'];
        
        this.authService.user.subscribe(
          user=> {
            this.user = user;
          }
        )
      }
    )

    this.user = new User(
      3,
      "LIBRERIA",
      "fab.asd@getMaxListeners.com",
      null,
      {
        name: "di fabrizio",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac blandit felis. Ut commodo nisl a ligula elementum gravida. Aliquam at neque sed nibh condimentum mattis. Suspendisse aliquam est et pretium auctor. Ut eu lacus dapibus, pellentesque dui id, posuere ante. Vivamus eu odio tempus, tempor orci at, porttitor risus. Proin egestas lorem in ex aliquam efficitur. Morbi justo purus, ultricies sed placerat non, convallis quis justo. Sed mattis a sapien in elementum. Maecenas finibus neque commodo velit mollis dictum vitae porta mauris.",
        piva: "12345678910"
      },
      1,
      2,
      65014,
      "quella strada",
      "secondo sottoscala",
      "sdvsdvs",
      new Date(new Date().getTime())
    )
  }
}