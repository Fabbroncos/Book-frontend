import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { exhaustMap, take, tap } from 'rxjs/operators'
import { AuthService } from './auth.service'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.userData.pipe(
      take(1),
      exhaustMap((userData) => {
        if (!userData) {
          return next.handle(req)
        }
        const modifiedReq = req.clone({ headers: req.headers.set('Authorization', userData.token) })
        return next.handle(modifiedReq)
      }),
    )
  }
}
