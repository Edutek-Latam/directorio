import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { ExtensionesComponent } from './extensiones/extensiones.component';
import { ExtEditComponent } from './ext-edit/ext-edit.component';
import { ExtCreateComponent } from './ext-create/ext-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';


@NgModule({
  declarations: [
    HomeLayoutComponent,
    ExtensionesComponent,
    ExtEditComponent,
    ExtCreateComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
     NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiMjM0MDIyNzYzIiwiYSI6ImNsdmczNmxzeDByeGUya21veHdja3kycHIifQ.k3TIc2c4FTcKaqrZ_CKTcg', // Optional, can also be set per map (accessToken input of mgl-map)
    }) 
  ]
})
export class HomeModule { }
