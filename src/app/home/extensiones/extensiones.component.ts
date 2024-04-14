import { Component, OnInit } from '@angular/core';
import { ExtensionService } from '../../services/extension.service';
import { Extension } from '../../common/interfaces/extension.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-extensiones',
  templateUrl: './extensiones.component.html',
  styles: ``
})
export class ExtensionesComponent implements OnInit {
  extensiones?: Extension[];
  constructor(private _extensionService: ExtensionService,private _router: Router){

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

  editar(id: string) {
      this._router.navigate(['/edit',id])
  }
}
