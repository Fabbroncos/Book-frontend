import { Component, Input, OnInit } from "@angular/core";
import { Ad } from "src/app/ads/ad.model";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: 'app-ads-list-item-component',
  templateUrl: './ads-list-item.component.html',
  styleUrls: ['./ads-list-item.component.css']
})
export class AdsListItemComponent implements OnInit{
  @Input('ad') ad: Ad

  constructor(private authService: AuthService) {}

  srcImage: string = ""

  ngOnInit() {
    console.log(this.ad);
    
    // this.ad["type"] = "S";
    this.ad["price"] = "15.99€";
    if(this.ad.images[0]){
      this.srcImage =  this.authService.url+ "/api/v1/adImages/" +this.ad.images[0].url
    }
    
    
  }
}