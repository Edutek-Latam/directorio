import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { ExtensionesComponent } from './extensiones/extensiones.component';
import { ExtEditComponent } from './ext-edit/ext-edit.component';
import { ExtCreateComponent } from './ext-create/ext-create.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeLayoutComponent,
    ExtensionesComponent,
    ExtEditComponent,
    ExtCreateComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
