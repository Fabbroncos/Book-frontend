import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { map } from 'rxjs/operators'
import { AuthService } from './auth.service'
import { environment } from 'src/environments/environment.prod'

export interface City {
  id: number
  name: string
  province_id: string
}

@Injectable({
  providedIn: 'root',
})
export class CityResolverService implements Resolve<City[]> {
  constructor(private http: HttpClient, private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.user.value.comune) {
      return this.http
        .get(`${environment.apiUrl}/api/v1/provinces/${this.authService.user.value.comune.province_id}/comuni`)
        .pipe(
          map((resData: { message: string; data: City[] }) => {
            console.log(resData)

            return resData.data
          }),
        )
    } else {
      return null
    }
  }
}
