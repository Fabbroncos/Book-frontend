import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { throwError } from 'rxjs'
import { catchError, exhaustMap, take } from 'rxjs/operators'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-account.component.html',
})
export class ConfirmAccountComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute, private authService: AuthService) {}
  token: string

  ngOnInit() {
    this.route.params
      .pipe(
        take(1),
        exhaustMap((params: Params) => {
          this.token = params['token']
          return this.authService.confirmAccount(this.token)
        }),
      )
      .subscribe((params: Params) => {
        console.log(params['token'])
        console.log(params)
      })
  }
}
