import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { ExtensionesComponent } from './extensiones/extensiones.component';
import { ExtEditComponent } from './ext-edit/ext-edit.component';

const routes: Routes = [
  {path:'',component:HomeLayoutComponent, children:[
    {path:'', component: ExtensionesComponent},
    {path:'edit/:id',component: ExtEditComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
