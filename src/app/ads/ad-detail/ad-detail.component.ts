import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { Ad, adImage } from "../ad.model";
import { environment } from "src/environments/environment.prod";

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
          `${environment.apiUrl}/api/v1/ads/${this.id}`
        ).subscribe(
          (ad: {message: string, data: Ad}) => {
            this.ad = ad.data
            console.log(this.ad);
            
          }
        )
        
      }
    )
  }

  gte(data: Element) {
    console.log(data.attributes);
    
  }

  openChat() {
    console.log(this.authService.isLogged);
    console.log();
    
    if (!this.authService.isLogged) {
      this.router.navigate([`/auth/login`])
    } else {
      this.http.post(
        `${environment.apiUrl}/api/v1/chats`,
        {
          "ad_id": this.ad.id
        }
      ).subscribe(
        chatData=> {
          console.log(chatData);
          this.router.navigate([`/${this.id}/chat`])
          
        }
      )
    }
  }

  getUrl(img: adImage) {
    return `${environment.apiUrl}/api/v1/adImages/${img.url}`
  }

  onDelete() {
    this.http.delete(
      `${environment.apiUrl}/api/v1/ads/${this.id}`
    ).subscribe(
      (resData) => {
        console.log(resData);
      }
    )
  }
}