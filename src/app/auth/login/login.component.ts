import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  frmLogin : FormGroup;
  isSubmited: boolean = false
  constructor(private _authService: AuthServiceService, private _formBuilder: FormBuilder, private _router: Router ){
    this.frmLogin = this._formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(){
    if(this.isSubmited) return;

    if(this.frmLogin.valid){
      this.isSubmited = true;
      this._authService.isAuth = true;
      setTimeout(() => {
        this._router.navigate([''])
        this.isSubmited = false
      }, 1000);
    }
  }

}
