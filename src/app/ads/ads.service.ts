import { Injectable } from "@angular/core";
import { promisify } from "util";

@Injectable({
  providedIn: 'root'
})
export class AdsService {


  getAds(...prms: object[]) {
    console.log(prms);
    
  }

}