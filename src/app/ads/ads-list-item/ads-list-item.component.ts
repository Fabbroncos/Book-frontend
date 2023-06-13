import { Ad } from 'src/app/ads/ad.model'
import { AuthService } from 'src/app/auth/auth.service'
import { environment } from 'src/environments/environment.prod'

import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core'

@Component({
  selector: 'app-ads-list-item-component',
  templateUrl: './ads-list-item.component.html',
  styleUrls: ['./ads-list-item.component.css'],
})
export class AdsListItemComponent implements OnInit {
  @Input('ad') ad: Ad
  @Input('mode') mode: string

  constructor(private authService: AuthService) {}

  srcImage = ''

  @ViewChild('imgAds') imgAds: ElementRef
  loaded() {
    if (this.imgAds.nativeElement.height >= this.imgAds.nativeElement.width) {
      this.imgAds.nativeElement.classList.add('w-100')
    } else {
      this.imgAds.nativeElement.classList.add('h-100')
    }
  }

  @ViewChild('imgAdsList') imgAdsList: ElementRef
  @ViewChild('imgAdsContainer') imgAdsContainer: ElementRef
  loadedListImg() {
    if (this.imgAdsList.nativeElement.height >= this.imgAdsList.nativeElement.width && this.ad.images[0]) {
      this.imgAdsList.nativeElement.classList.add('w-100')
    } else {
      this.imgAdsList.nativeElement.classList.add('h-100')
      this.imgAdsContainer.nativeElement.classList.add('h-100')
    }
  }

  ngOnInit() {
    // console.log(this.ad);

    // this.ad["type"] = "S";
    // this.ad["price"] = "15.99€";

    if (this.ad.images[0]) {
      this.srcImage = environment.apiUrl + '/api/v1/adImages/' + this.ad.images[0].url
      if (this.ad.id % 2 === 0) {
        this.srcImage = '/assets/babel.jpg'
      } else {
        this.srcImage = '/assets/potter2.jpg'
      }
    } else {
      this.srcImage = '/assets/no_image.png'
    }
  }
}
