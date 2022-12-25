import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'

import { Genre } from './ad.model'

@Component({
  selector: 'app-ads-viewer-component',
  templateUrl: './ads-viewer.component.html',
  styleUrls:['./ads-viewer.component.css']
})
export class AdsViewerComponent implements OnInit {
  type = ''
  genres: Genre[] = []
  years: number[] = []

  filterHide = true

  page = 1

  params: Params

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const cont: string = this.router.url

    const startYear = 1850
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

  toggleType(type: string) {
    if (type === this.type) {
      this.type = ''
    } else {
      this.type = type
    }
  }

  hideFilter() {
    this.filterHide = !this.filterHide
  }

  onSubmit(filterForm: NgForm) {
    let params = { ...this.params }

    for (const key in filterForm.value) {
      if (filterForm.value[key] !== '') {
        params[key] = filterForm.value[key]
      }
    }
    delete params.page
    delete params.type
    if (this.type !== '') {
      params = { ...filterForm.value }
      params.type = this.type
    }
    if (params.genre) {
      params.genre_id = params.genre[0].id
    }

    console.log(params)

    this.params = params
  }
}
