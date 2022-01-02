import { getLocaleDateTimeFormat } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Ad } from "../ads/ad.model";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  ads: Ad[] = [];
  adsPopolari: Ad[] = [];
  adsConsigliati: Ad[] = [];
  adsNovitaS: Ad[] = [];
  adsNovitaF: Ad[] = [];

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.http.get(
      `${this.authService.url}/api/v1/ads`,
      {
        params: {"type": "S"}
      }
    ).subscribe(
      (adsData: any) => {
        
        this.ads = adsData.data.data;
        this.adsPopolari = this.ads.slice(0,3);
        this.adsConsigliati = this.ads.slice(this.ads.length-3, this.ads.length);
        this.adsNovitaS = this.ads.slice(0,this.ads.length < 10 ? this.ads.length : 9 );

        console.log(this.ads);
        console.log(this.adsPopolari);
        console.log(this.adsConsigliati);
        console.log(this.adsNovitaS);
        

      }
    )
    this.http.get(
      `${this.authService.url}/api/v1/ads`,
      {
        params: {"type": "F"}
      }
    ).subscribe(
      (adsData: any) => {
        
        this.adsNovitaF = adsData.data.data
        console.log(this.adsNovitaF);

      }
    )
  }

  getImageUrl(ad: Ad) {
    return `${this.authService.url}/api/v1/adImages/${ad.images[0].url}` 
  }

  getDayAgo(ad: Ad) {
    let date: Date = new Date(Date.parse(ad.created_at))
    let nowe = ((new Date(Date.now()).getTime() - date.getTime())/1000)/60

    if(nowe <= 60) {
      return `${nowe} minute ago`
    } else if (nowe >= 60 && nowe <= 1440){
      return `${Math.trunc((nowe)/60)} hours ago`
    } else if (nowe >= 1440 && nowe <= 10080){
      return `${Math.trunc(((nowe)/60)/24)} day ago`
    } else if (nowe >= 10080 && nowe <= 43800){
      return `${Math.trunc((((nowe)/60)/24)/7)} week ago`
    } else {
      return "long time ago"
    }
  }

}