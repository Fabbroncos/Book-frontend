import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap( user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({headers: req.headers.set('Authorization', user.token)})
        return next.handle(modifiedReq);
      })
    )
  }
}