import { HttpClient } from '@angular/common/http'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Params } from '@angular/router'
import { Ad } from 'src/app/ads/ad.model'
import { AuthService } from 'src/app/auth/auth.service'
import { environment } from 'src/environments/environment.prod'

@Component({
  selector: 'app-owner-ads',
  templateUrl: './owner-ads.component.html',
})
export class OwnerAdsComponent implements OnInit {
  ads: Ad[] = []
  params: Params = { owner: true }
  constructor(private http: HttpClient, private authService: AuthService) {}
  ngOnInit() {
    // this.http.get(
    //   `${environment.apiUrl}/api/v1/ads`,
    //   {
    //     params:{
    //       "owner": true
    //     }
    //   }
    // ).subscribe(
    //   (adsData: {data: {data: Ad[]}}) => {
    //     console.log(adsData);
    //     this.ads = adsData.data.data
    //   }
    // )
  }

  @ViewChild('searchInput') searchInput: ElementRef
  onSearch() {
    this.params = { ...this.params, title: this.searchInput.nativeElement.value }
    // this.http.get(
    //   `${environment.apiUrl}/api/v1/ads`,
    //   {
    //     params:{
    //       "title": this.searchInput.nativeElement.value,
    //       "owner": true
    //     }
    //   }
    // ).subscribe(
    //   (adsData: {data: {data: Ad[]}}) => {
    //     console.log(adsData);

    //     this.ads = adsData.data.data
    //   }
    // )
  }
}
