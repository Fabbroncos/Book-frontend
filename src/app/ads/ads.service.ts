import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Ad } from "./ad.model";

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAds(params?) {
    return this.http.get(
      `${this.authService.url}/api/v1/ads`,
      {
        params: params
      }
    )
  }

}