import { Component, OnInit } from '@angular/core';
import { ExtensionService } from '../../services/extension.service';
import { Extension } from '../../common/interfaces/extension.interfaces';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { MENSAJES } from '../../common/enums';
@Component({
  selector: 'app-extensiones',
  templateUrl: './extensiones.component.html',
  styles: ``
})
export class ExtensionesComponent implements OnInit {
  extensiones?: Extension[];
  constructor(
    private _extensionService: ExtensionService,
    private _router: Router,
    private _dataService: DataService
    ){

  }
  ngOnInit(): void {
      this._extensionService.getAll()
      .subscribe({next:result=>{
        this.extensiones = result;
        //console.log(result)
      },error:errors=>{
        console.error(errors)
      }
    })
  }

  nuevo(){
    this._router.navigate(['/nuevo'])
  }

remove(id: string){

  Confirm.show(
  'SISTEMA',
  MENSAJES.REMOVE_MESSAGE,
  'Si','No',
  () => {
    this._extensionService.remove(id)
    .subscribe({next:result=>{
     this.extensiones =  this.extensiones?.filter(e=>e._id != id);
    },error:errors=>{}})
  },
  () => {alert('If you say so...');},{
  },);

  /* this._extensionService.remove(id)
  .subscribe({next:result=>{
    console.log(result)
  },error:errors=>{}}) */
}

  editar(extension:Extension){
    this._dataService.extension = extension;
    this._router.navigate(['/edit'])
    console.log(extension)
  }
  /* editar(id: string) {
      this._router.navigate(['/edit',id])
  } */
}
