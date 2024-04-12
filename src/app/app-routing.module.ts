import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuardGuard } from './guard/auth-guard.guard';
import { loginGuard } from './guard/login.guard';

const routes: Routes = [
  //{path:'',redirectTo:'home', pathMatch:'full'},
  {path:'login', component:LoginComponent, canActivate:[loginGuard]},
  {path:'',loadChildren:()=> import('./home/home.module').then(m=>m.HomeModule),canActivate:[authGuardGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
