import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //console.log(req);
    
    return next.handle(req).pipe(
      tap((event) => {

        if (event instanceof HttpResponse) {
          //console.log(event.headers);
        }
      })
    );
  }
}