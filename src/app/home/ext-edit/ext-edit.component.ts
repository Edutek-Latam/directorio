import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ExtensionService } from '../../services/extension.service';
import { Extension } from '../../common/interfaces/extension.interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-ext-edit',
  templateUrl: './ext-edit.component.html',
  styles: ``
})
export class ExtEditComponent implements OnInit {
  extension? : Extension
  frmExtension : FormGroup;
  isSubmited: boolean = false;
  private id?: string; 
  constructor(private _activeRouter: ActivatedRoute, 
    private _extensionService: ExtensionService,
    private _router: Router,
    private _frmBuilder: FormBuilder
    ){

      ///console.log(Object.keys(this.extension))
      this.frmExtension = this._frmBuilder.group({
        extension:[''],
        puesto_departamento:[''],
        nombre:[''],
        correo:['']
      })    
  }
  ngOnInit(): void {
    let param = this._activeRouter.snapshot.params;
    if(param){
      this.id = param['id'];
      this._extensionService.getByID(param['id'])
      .subscribe({
        next: result=>{
          this.extension = result
          this.frmExtension.patchValue(this.extension);
        },
        error: errors=>{
          console.error(errors)
        }
      });
    }else{
      this._router.navigate(['']);
    }
  }

  onSubmit(){
    if(this.isSubmited) return;

    this.isSubmited =true;
    let updateExtension = this.frmExtension.value
    this._extensionService
    .update(this.extension!._id,updateExtension)
    .subscribe({
      next:result=>{
        Notify.success('Registro actualizado con exito');
        setTimeout(() => {
          this.isSubmited = false;
          this._router.navigate(['']);
        }, 1000);
       
      }
    })
    
  }
}
