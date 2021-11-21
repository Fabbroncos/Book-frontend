import { HttpClient } from "@angular/common/http";
import { stringify } from "@angular/compiler/src/util";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { Ad, Genre } from "src/app/ads/ad.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html'
})
export class AdsListComponent implements OnInit{
  listType = "Inserzioni";
  filterString = "";
  ads: Ad[];

  open: boolean = false;

  total= 1
  pageSize= 10
  offset= 0
  to= 0
  last_page= 1
  pageini= "1"
  from= 0
  years: number[] = []
  genres: Genre[] = []

  type: String = ""

  page: number;

  params: Params

  constructor(private route: ActivatedRoute, private router: Router ,private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.page = +this.pageini;
    
    let cont: string = this.router.url;

    let startYear = 1900;
    let endYear = new Date().getFullYear();

    for (let i = endYear; i > startYear; i--) {this.years.push(i);}

    this.route.data.subscribe(
      genreData => {
        console.log(genreData);
        
      }
    )

    this.route.queryParams.subscribe(
        (params: Params) => {
          console.log(params);
          this.getAds(params);
          this.params = params;
          // if (params['page']) {
            
          //   this.page = +params['page'];
          //   this.http.get(
          //     'http://159.89.30.229:3000/api/v1/ads',
          //     {
          //       headers: {
          //         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiQURNSU5JU1RSQVRPUiIsImNyZWF0ZWRfYXQiOiIyMDIxLTA4LTIzVDE5OjMxOjIxLjA5NVoiLCJpYXQiOjE2Mjk5MDc3MTUsImV4cCI6MTYyOTkxMTMxNX0.rTfpKW718JBhEDPymw1cNnZNFd8NmM-Q_3eZMaxTTW4"
          //       },
          //       params: params
          //     }
          //   ).subscribe(
          //     (resData: {message:string, 
          //       data:{
          //         data: {
          //           author: string,
          //           created_at: string,
          //           deleted_at: null
          //           description: string,
          //           genre: Genre,
          //           hidden: boolean,
          //           id: number,
          //           images: {
          //             ad_id: number,
          //             created_at: string,
          //             deleted_at: string,
          //             id: number,
          //             main: boolean,
          //             updated_at: string,
          //             url: string
          //           }[],
          //           publisher: string,
          //           title: string,
          //           updated_at: string,
          //           user_id: number
          //           year: number
          //         }[],
          //         from: number,
          //         last_page: number,
          //         offset: number,
          //         page: string,
          //         pageSize: number,
          //         to: number,
          //         total:number
          //       }}) => {
          //       console.log(resData.data.data[0].images[0]);
                
          //       this.imagePreview(resData.data.data[0].images)
        
          //       this.bookss = resData.data.data;
        
          //       this.total= resData.data.total
          //       this.pageSize= resData.data.pageSize
          //       this.offset= resData.data.offset
          //       this.to= resData.data.to
          //       this.last_page= resData.data.last_page
          //       this.page= +resData.data.page
          //       this.from= resData.data.from
        
          //       console.log(resData);
                
          //     }
          //   )
          // }
        }
    )
  }

  getAds(params?){
    this.http.get(
      `${this.authService.url}/api/v1/ads`,
      {
        params: params
      }
    ).subscribe(
      (resData: {message:string, 
        data:{
          data: Ad[],
          from: number,
          last_page: number,
          offset: number,
          page: string,
          pageSize: number,
          to: number,
          total:number
        }}) => {
        this.ads = resData.data.data;

        this.total= resData.data.total
        this.pageSize= resData.data.pageSize
        this.offset= resData.data.offset
        this.to= resData.data.to
        this.last_page= resData.data.last_page
        this.page= +resData.data.page
        this.from= resData.data.from

        console.log(resData);
      }
    )
  }

  nextPage() {
    this.params
    this.router.navigate(['/insertion'], {queryParams: {...this.params, page: this.page+1}})
  }

  previousPage() {
    this.router.navigate(['/insertion'], {queryParams: {...this.params, page: this.page-1}})
  }

  toggleType(type: String) {
    console.log(type);
    console.log(this.type);
    
    if(type === this.type) {
      this.type = ""
    } else {
      this.type = type
    }
  }

  changePage(mode: string) {
    let page = this.page
    switch (mode) {
      case "+":
        page+=1;
        break
      case "++":
        page = this.last_page
        break
      case "-":
        page -= 1
        break
      case "--":
        page = 1
        break
    }
    this.params= { ...this.params, "page": page}
    this.getAds(this.params)
  }

  onSubmit(filterForm: NgForm) {
    let params = {...this.params}

    for (const key in filterForm.value) {
      if(filterForm.value[key] !== "") {
        params[key] = filterForm.value[key]
      }
    }
    delete params.page
    if(this.type !== "") {
      params = {...filterForm.value}
      params.type = this.type
    }
    this.getAds(params)
    console.log(params);
    console.log(filterForm.value);
    
  }
}