import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

export const loginGuard: CanActivateFn = async(route, state) => {
  const router = inject(Router)
  const _autService = inject(AuthServiceService);
  const isValid = await _autService.isAuth;
  console.log(isValid)
  if(isValid){
    router.navigate([''])
  }
 
  return true;
 
};
