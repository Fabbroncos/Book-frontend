import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Ad } from "src/app/ads/ad.model";
import { AuthService } from "src/app/auth/auth.service";


@Component({
  selector: "app-owner-ads",
  templateUrl: "./owner-ads.component.html"
})
export class OwnerAdsComponent implements OnInit {
  ads: Ad[] = []
  constructor(private http: HttpClient, private authService: AuthService) {}
  ngOnInit() {
    this.http.get(
      `${this.authService.url}/api/v1/ads`,
      {
        headers:{
          "Authorization": this.authService.user.value.token
        },
        params:{
          "owner": true
        }
      }
    ).subscribe(
      (adsData: {data: {data: Ad[]}}) => {
        console.log(adsData);
        
        this.ads = adsData.data.data
      }
    )
  }

  @ViewChild('searchInput') searchInput: ElementRef
  onSearch() {
    this.http.get(
      `${this.authService.url}/api/v1/ads`,
      {
        headers:{
          "Authorization": this.authService.user.value.token
        },
        params:{
          "title": this.searchInput.nativeElement.value,
          "owner": true
        }
      }
    ).subscribe(
      (adsData: {data: {data: Ad[]}}) => {
        console.log(adsData);
        
        this.ads = adsData.data.data
      }
    )
    
  }
}