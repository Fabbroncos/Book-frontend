import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { Ad } from "../ad.model";

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html'
})
export class AdDetailComponent implements OnInit{
  id: number;
  ad: Ad;

  userId: number;
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.userId = this.authService.user.value ? this.authService.user.value.id : null;
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['book-id'];
        
        this.http.get(
          `${this.authService.url}/api/v1/ads/${this.id}`
        ).subscribe(
          (ad: {message: string, data: Ad}) => {
            this.ad = ad.data
          }
        )
        
      }
    )
  }

  openChat() {
    console.log(this.authService.isLogged());
    
    if (!this.authService.user.value.token) {
      this.router.navigate([`/auth/login`])
    } else {
      this.http.post(
        `${this.authService.url}/api/v1/chats`,
        {
          "ad_id": this.ad.id
        },
        {
          headers: {
            "Authorization": this.authService.user.value.token
          }
        }
      ).subscribe(
        chatData=> {
          console.log(chatData);
          this.router.navigate([`/${this.id}/chat`])
          
        }
      )
    }
  }

  onDelete() {
    this.http.delete(
      `${this.authService.url}/api/v1/ads/${this.id}`,
      {
        headers: {
          "Authorization": this.authService.user.value.token
        }
      }
    ).subscribe(
      (resData) => {
        console.log(resData);
      }
    )
  }
}