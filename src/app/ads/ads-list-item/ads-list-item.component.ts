import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Ad } from "src/app/ads/ad.model";
import { AuthService } from "src/app/auth/auth.service";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: 'app-ads-list-item-component',
  templateUrl: './ads-list-item.component.html',
  styleUrls: ['./ads-list-item.component.css']
})
export class AdsListItemComponent implements OnInit, OnChanges{
  @Input('ad') ad: Ad
  @Input('mode') mode: String

  constructor(private authService: AuthService) {}

  srcImage: string = ""

  ngOnChanges() {
    

  }

  ngOnInit() {
    // console.log(this.ad);
     
    // this.ad["type"] = "S";
    // this.ad["price"] = "15.99€";
    if(this.ad.images[0]){
      this.srcImage = environment.apiUrl+ "/api/v1/adImages/" +this.ad.images[0].url
    } else {
      this.srcImage = "/assets/no_image.png"
    }
    
  }
}