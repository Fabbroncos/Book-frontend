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

  user
  params: Params = { user_id: null }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.params.user_id = params.user_id
      this.http.get(`${environment.apiUrl}/api/v1/users/info/${params.user_id}`).subscribe((data: { data }) => {
        console.log(data.data)
        this.user = data.data
      })
    })
  }
}
