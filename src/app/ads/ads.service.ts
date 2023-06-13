import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service'
import { Ad } from './ad.model'
import { environment } from 'src/environments/environment.prod'

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAds(params?) {
    return this.http.get(`${environment.apiUrl}/api/v1/ads`, {
      params: params,
    })
  }
}
