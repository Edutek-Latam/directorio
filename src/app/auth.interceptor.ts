import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { AuthServiceService } from './services/auth-service.service';
import { inject } from '@angular/core';
import { hmac } from './common/auth/hmac';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _authService = inject(AuthServiceService);
  const headers = new HttpHeaders()
  .set('Authorization',`Bearer ${_authService.token}`)

  //console.log(hmac(req.body??{}));
  //console.log(req.body)
  const authReq = req.clone({
    setHeaders:{
      Authorization:`${hmac(req.body??{})}`
    }
  })
  return next(authReq);
};
