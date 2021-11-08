import { Component, Input, OnInit } from "@angular/core";
import { Ad } from "src/app/ads/ad.model";

@Component({
  selector: 'app-ads-list-item-component',
  templateUrl: './ads-list-item.component.html',
  styleUrls: ['./ads-list-item.component.css']
})
export class AdsListItemComponent implements OnInit{
  @Input('ad') ad: Ad

  srcImage: string = ""

  ngOnInit() {
    console.log(this.ad);
    
    this.ad["type"] = "vendo";
    this.ad["price"] = "15.99€";
    this.srcImage = "HTTPS://api.datge.cloud/api/v1/adImages/" + this.ad.images[0].url
    
    
  }
}