import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { EmailValidator } from '@angular/forms'
import { Router } from '@angular/router'
import { BehaviorSubject, throwError } from 'rxjs'
import { catchError, exhaust, exhaustMap, map, take, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment.prod'
import { User } from '../account/user.model'

export interface AuthResponseData {
  data: string
  message: string
}

export interface UserData {
  id: number
  role: string
  token: string
  exp: number
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData = new BehaviorSubject<UserData>(null)
  //userData: UserData;
  user = new BehaviorSubject<User>(null)

  private tokenExpirationTimer: any

  constructor(private http: HttpClient, private router: Router) {}

  isLogged: boolean = false

  parseJwt(token) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join(''),
    )

    return JSON.parse(jsonPayload)
  }

  register(info) {
    return this.http.post(`${environment.apiUrl}//v1/auth/register`, info)
  }

  login(email: string, password: string) {
    return this.http
      .post(/*<AuthResponseData>*/ `${environment.apiUrl}//v1/auth/login`, {
        email: email,
        password: password,
      })
      .pipe(
        tap((resData: AuthResponseData) => {
          const data = this.parseJwt(resData.data)

          const userData = {
            id: data.id,
            role: data.role,
            token: resData.data,
            exp: data.exp,
          }
          this.userData.next(userData)

          this.isLogged = true

          const expirationDuration = new Date(userData.exp).getTime() * 1000 - new Date().getTime()
          this.autoLogout(expirationDuration)

          localStorage.setItem('userData', JSON.stringify(userData))
          // this.loadUser();
        }),
        take(1),
        exhaustMap((value) => {
          return this.loadUser()
        }),
      )
  }

  loadUser() {
    console.log('pass')

    return this.http.get(`${environment.apiUrl}//v1/users/${this.userData.value.id}`).pipe(
      tap((resData) => {
        const expirationDate = new Date(+this.userData.value.exp * 1000)
        const loadedUser = new User(
          this.userData.value.id,
          resData['data'].role,
          resData['data'].email,
          resData['data'].user_infos ? resData['data'].user_infos : null,
          resData['data'].library_infos ? resData['data'].library_infos : null,
          resData['data'].comune ? resData['data'].comune : null,
          resData['data'].zip_code ? resData['data'].zip_code : null,
          resData['data'].street_address_1 ? resData['data'].street_address_1 : null,
          resData['data'].street_address_2 ? resData['data'].street_address_2 : null,
          this.userData.value.token,
          expirationDate,
        )
        if (loadedUser.comune) {
          this.http
            .get<any>(`${environment.apiUrl}//v1/provinces/${loadedUser.comune.province_id}`)
            .subscribe((provinceData) => {
              loadedUser.province = provinceData.data.name
              this.user.next(loadedUser)
              localStorage.setItem('userDetail', JSON.stringify(loadedUser))
              console.log(this.user.value)
            })
        } else {
          this.user.next(loadedUser)
        }
        console.log(resData)
      }),
    )
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'))

    if (!userData) {
      return
    }

    if (!userData.exp || new Date() > new Date(userData.exp * 1000)) {
      return
    }

    if (userData.token) {
      this.userData.next(userData)
      const userJSON = JSON.parse(localStorage.getItem('userDetail'))

      if (userJSON) {
        const user = new User(
          userJSON.id,
          userJSON.role,
          userJSON.email,
          userJSON.userInfos,
          userJSON.libraryInfos,
          userJSON.comune,
          userJSON.zipCode,
          userJSON.streetAddress1,
          userJSON.streetAddress2,
          userData.token,
          new Date(+userData.exp * 1000),
        )
        user.province = userJSON.province ? userJSON.province : null
        this.isLogged = true
        this.user.next(user)
      }
      const expirationDuration = new Date(userData.exp).getTime() * 1000 - new Date().getTime()
      this.autoLogout(expirationDuration)
    }
  }

  logout() {
    console.log('LOGOUT')
    this.user.next(null)
    this.userData.next(null)
    this.isLogged = false
    localStorage.removeItem('userData')
    localStorage.removeItem('userDetail')
    this.router.navigate(['/home'])
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      console.log("Sloggo");
      this.logout()
    }, expirationDuration)
  }

  changePassword(password: string, newPassword: string, newPasswordConfirm: string) {
    return this.http.post(`${environment.apiUrl}//v1/auth/change-password`, {
      password: password,
      passwordNew: newPassword,
      passwordConfirm: newPasswordConfirm,
    })
  }

  confirmAccount(token: string) {
    return this.http.get(`${environment.apiUrl}//v1/auth/confirm-account/${token}`, {
      headers: {
        data: `Bearer ${token}`,
      },
    })
    // .pipe(
    //   catchError(this.handleError)
    // )
  }
}
