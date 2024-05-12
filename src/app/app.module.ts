import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings,  } from 'ng-recaptcha';
import { environment } from '../environments/environment';
import { authInterceptor } from './auth.interceptor';
console.log(environment.siteKey);
//Clave del sitio
//6LedeccpAAAAAAI7ntZ6xPDbtJ0GTdTi2P37L2cv
//clave secreta
//6LedeccpAAAAACzIims7BcBf6nEyxHXMW_wOgxml
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: { siteKey: '6LedeccpAAAAAAI7ntZ6xPDbtJ0GTdTi2P37L2cv' } as RecaptchaSettings,
  },
  provideHttpClient(withInterceptors([authInterceptor]))
],
  bootstrap: [AppComponent]
})
export class AppModule { }
