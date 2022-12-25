import { HttpClient } from '@angular/common/http'
import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { environment } from 'src/environments/environment.prod'

@Component({
  selector: 'app-public-user-detail',
  templateUrl: 'public-user-detail.component.html',
})
export class PublicUserDetail implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  user_id: number
  user
  params: Params = null

  ngOnInit() {
    this.params = { user_id: this.user_id }
    this.route.params.subscribe((params: Params) => {
      console.log(params)
      this.user_id = params.user_id
      this.http.get(`${environment.apiUrl}/api/v1/users/info/${this.user_id}`).subscribe((data: { data }) => {
        console.log(data.data)
        this.user = data.data
      })
    })
  }
}
