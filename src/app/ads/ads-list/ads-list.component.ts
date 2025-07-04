import { Subject, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { Ad, Genre } from 'src/app/ads/ad.model'
import { AuthService } from 'src/app/auth/auth.service'
import { environment } from 'src/environments/environment.prod'

import { HttpClient } from '@angular/common/http'
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'

import { AdsService } from '../ads.service'

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css'],
})
export class AdsListComponent implements OnInit, OnChanges {
  listType = 'Inserzioni'
  filterString = ''
  ads: Ad[]

  open = false

  total = 1
  pageSize = 10
  offset = 0
  to = 0
  last_page = 1
  pageini = '1'
  from = 0
  years: number[] = []
  genres: Genre[] = []

  type = ''

  page: number

  @Input('params') params: Params

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private adsService: AdsService,
  ) {}

  ngOnChanges() {
    this.adsService.getAds(this.params).subscribe(
      (adsData: any) => {
        this.ads = adsData.data.data
        this.last_page = adsData.data.last_page
      },
      (error) => {
        console.log(error)
      },
    )
  }

  ngOnInit() {
    this.page = +this.pageini

    const cont: string = this.router.url

    const startYear = 1900
    const endYear = new Date().getFullYear()

    for (let i = endYear; i > startYear; i--) {
      this.years.push(i)
    }

    this.route.data.subscribe((genreData) => {
      this.genres = genreData[0]
    })

    this.route.queryParams.subscribe((params: Params) => {
      this.params = params
    })
  }

  nextPage() {
    this.params['page'] = this.page + 1
    console.log(this.params)

    this.router.navigate(['/home'], { queryParams: { ...this.params, page: this.page + 1 } })
  }

  previousPage() {
    this.router.navigate(['/home'], { queryParams: { ...this.params, page: this.page - 1 } })
  }

  changePage(mode: string) {
    let page = this.page
    switch (mode) {
      case '+':
        page += 1
        break
      case '++':
        page = this.last_page
        break
      case '-':
        page -= 1
        break
      case '--':
        page = 1
        break
    }
    this.params = { ...this.params, page: page }
    console.log(this.params)

    this.adsService.getAds(this.params).subscribe((adsData: any) => {
      console.log(adsData)

      this.ads = adsData.data.data
      this.last_page = adsData.data.last_page
      this.page = adsData.data.page
      console.log(this.page + ' e ' + this.last_page)
    })
  }

  adsLoaded() {
    if (this.ads) {
      if (this.ads.length !== 0) {
        return true
      }
    }
    return false
  }

  mode = 'gridCard'
  changeMode() {
    switch (this.mode) {
      case 'list':
        this.mode = 'grid'
        break
      case 'grid':
        this.mode = 'gridCard'
        break
      case 'gridCard':
        this.mode = 'list'
        break
    }
  }
}
