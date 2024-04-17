import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExtensionService } from '../../services/extension.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { MENSAJES } from '../../common/enums';

@Component({
  selector: 'app-ext-create',
  templateUrl: './ext-create.component.html',
  styles: ``
})
export class ExtCreateComponent {
  frmExtension : FormGroup;
  isSubmited: boolean = false;
  constructor(private _activeRouter: ActivatedRoute, 
    private _extensionService: ExtensionService,
    private _router: Router,
    private _frmBuilder: FormBuilder,
    private _dataService: DataService
    ){

      ///console.log(Object.keys(this.extension))
      this.frmExtension = this._frmBuilder.group({
        extension:[],
        puesto_departamento:[''],
        nombre:[''],
        correo:['']
      })    
    }

    onSubmit(){
      if(this.isSubmited) true;

      if(this.frmExtension.valid){
        this.isSubmited = true;
        this._extensionService.ceate(this.frmExtension.value)
        .subscribe({next:result=>{
          Report.success('Sistema',
          MENSAJES.CREATE,
          'Aceptar',
          ()=>{
            this._router.navigate([''])
          }
          );
        },error: error=>{
          Report.failure(
            'Sistema',
          MENSAJES.ERROR_CREATE,
          'Aceptar',);
        }});
        this.isSubmited = false;
      }
    }

}
