import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
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
  constructor(private route: ActivatedRoute, private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.userId = this.authService.user.value ? this.authService.user.value.id : null;
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['book-id'];
        
        this.http.get(
          `http://65.108.49.43/api/v1/ads/${this.id}`
        ).subscribe(
          (ad: {message: string, data: Ad}) => {
            this.ad = ad.data
          }
        )
        
      }
    )
  }

  onDelete() {
    this.http.delete(
      `http://65.108.49.43/api/v1/ads/${this.id}`
    ).subscribe(
      (resData) => {
        console.log(resData);
      }
    )
  }
}