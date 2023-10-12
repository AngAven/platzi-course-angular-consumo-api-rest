import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from "../services/token.service";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addToken(request)

    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>) {
    const token = this.tokenService.getToken()

    if (token) {
      let headers = new HttpHeaders()
      headers = headers.set('Authorization', `Bearer ${token}`)

      const authReq = request.clone({headers})

      return authReq
    }

    return request
  }
}
