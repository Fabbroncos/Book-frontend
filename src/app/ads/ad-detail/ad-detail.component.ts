import { HttpClient } from '@angular/common/http'
import { Component, ElementRef, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { AuthService } from 'src/app/auth/auth.service'
import { Ad, adImage } from '../ad.model'
import { environment } from 'src/environments/environment.prod'

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.css'],
})
export class AdDetailComponent implements OnInit {
  id: number
  ad: Ad
  zoomImageShow: boolean = false
  username
  price = ["1","00"]

  userId: number
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.userId = this.authService.user.value ? this.authService.user.value.id : null
    this.route.params.subscribe((params: Params) => {
      this.id = +params['book-id']

      this.http.get(`${environment.apiUrl}/api/v1/ads/${this.id}`).subscribe((ad: { message: string; data: Ad }) => {
        this.ad = ad.data
        this.price = this.ad.price.toString().split(".");
        console.log(this.ad)
        this.http.get(`${environment.apiUrl}/api/v1/users/info/${this.ad.user_id}`).subscribe((data: { data }) => {
          console.log(data.data)
          if (data.data.user_infos) {
            this.username = data.data.user_infos.first_name
          } else {
            this.username = data.data.library_infos.name
          }
        })
      })
    })
  }

  imgZoom() {
    this.zoomImageShow = !this.zoomImageShow
  }

  gte(data: Element) {
    console.log(data.attributes)
  }

  openChat() {
    console.log(this.authService.isLogged)
    console.log()

    if (!this.authService.isLogged) {
      this.router.navigate([`/auth/login`])
    } else {
      this.http
        .post(`${environment.apiUrl}/api/v1/chats`, {
          ad_id: this.ad.id,
        })
        .subscribe((chatData: any) => {
          console.log(chatData)
          this.router.navigate([`/${this.id}/chat`], { queryParams: { chat_id: chatData.data.id } })
        })
    }
  }

  getUrl(img: adImage) {
    return '/assets/babel.jpg' //`${environment.apiUrl}/api/v1/adImages/${img.url}`
  }

  onDelete() {
    let url = this.ad.type === 'S' ? environment.apiUrl + '/api/v1/ads/sell' : environment.apiUrl + '/api/v1/ads/search'

    this.http.delete(`${url}/${this.id}`).subscribe((resData) => {
      this.router.navigate([`./${this.authService.user.value.id}/my-insertion`])
    })
  }
}
