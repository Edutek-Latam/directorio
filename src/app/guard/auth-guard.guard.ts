import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

export const authGuardGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router)
  const _autService = inject(AuthServiceService);
  const isValid = await _autService.isAuth;
  
  console.log(isValid.nombre)
  if(!isValid){
    sessionStorage.removeItem('auth')
    router.navigate(['login'])
  }
 
  if(_autService.isExpired){  
    sessionStorage.removeItem('auth')
    router.navigate(['login'])
  }
  return true;
};
