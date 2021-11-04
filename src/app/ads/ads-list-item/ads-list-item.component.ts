import { Component, Input, OnInit } from "@angular/core";
import { Ad } from "src/app/ads/ad.model";

@Component({
  selector: 'app-ads-list-item-component',
  templateUrl: './ads-list-item.component.html',
  styleUrls: ['./ads-list-item.component.css']
})
export class AdsListItemComponent implements OnInit{
  @Input('ad') ad: Ad

  ngOnInit() {
    // this.ad["type"] = "vendo";
    // this.ad["price"] = "15.99€";
    
  }
}