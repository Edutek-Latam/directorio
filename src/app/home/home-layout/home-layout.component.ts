import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { User } from '../../common/interfaces/user.interfaces';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styles: ``
})
export class HomeLayoutComponent {
    public user! : User
    constructor(private _authService: AuthServiceService){
      this.user = this._authService.isAuth
    }
}
