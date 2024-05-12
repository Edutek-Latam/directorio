import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { ExtensionesComponent } from './extensiones/extensiones.component';
import { ExtEditComponent } from './ext-edit/ext-edit.component';
import { ExtCreateComponent } from './ext-create/ext-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { TiendaComponent } from './tiendas/tienda/tienda.component';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [
    HomeLayoutComponent,
    ExtensionesComponent,
    ExtEditComponent,
    ExtCreateComponent,
    TiendaComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    GoogleMapsModule
  ]
})
export class HomeModule { }
