import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Genre } from "./ad.model";

@Component({
  selector: 'app-ads-viewer-component',
  templateUrl: './ads-viewer.component.html'
})
export class AdsViewerComponent implements OnInit{
  type: String = ""
  genres: Genre[] = []
  years: number[] = []

  page: number = 1

  params: Params

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    let cont: string = this.router.url;

    let startYear = 1900;
    let endYear = new Date().getFullYear();

    for (let i = endYear; i > startYear; i--) {this.years.push(i);}

    this.route.data.subscribe(
      genreData => {
        this.genres = genreData[0]
      }
    )

    this.route.queryParams.subscribe(
      (params: Params) => {
        this.params = params;
      }
    )
  }


  toggleType(type: String) {
    if(type === this.type) {
      this.type = ""
    } else {
      this.type = type
    }
  }

  onSubmit(filterForm: NgForm) {
    let params = {...this.params}

    for (const key in filterForm.value) {
      if(filterForm.value[key] !== "") {
        params[key] = filterForm.value[key]
      }
    }
    delete params.page
    delete params.type
    if(this.type !== "") {
      params = {...filterForm.value}
      params.type = this.type
    }

    this.params = params
  }
}