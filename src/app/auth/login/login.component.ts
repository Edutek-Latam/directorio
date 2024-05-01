import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { environment } from '../../../environments/environment';
import { Report } from 'notiflix/build/notiflix-report-aio';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  frmLogin : FormGroup;

  isSubmited: boolean = false
  constructor(
    private _authService: AuthServiceService, 
    private _formBuilder: FormBuilder, 
    private _router: Router,
    private _dataService: DataService
    ){

      console.log('env',environment.siteKey)
      this._dataService.clear();
    this.frmLogin = this._formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(3)]],
      recaptcha:['', [Validators.required]]
    });
  }

  onSubmit(){
    console.log('valid', this.frmLogin.valid)
     if(this.isSubmited) return;

    if(this.frmLogin.valid){
      this.isSubmited = true;
      this._authService.isAuth = true;
      setTimeout(() => {
        this._router.navigate([''])
        Report.success('Sistema','Bievenido','Acepar')
        this.isSubmited = false
      }, 1000);
    } 
  }

  resolved(event:any){
    //console.log(event);
  }

  errored(event:any){
    Report.failure('Sistema',event,'Aceptar')
  }

}
