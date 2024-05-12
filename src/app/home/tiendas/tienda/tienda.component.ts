import { Component } from '@angular/core';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styles: ``
})
export class TiendaComponent {
    mapOptions : google.maps.MapOptions={
      center:{lat:14.6285866,lng:-90.5557096},
      zoom:15,

    }
//14.6225788,-90.5567321
    marker = {position:{lat:14.6225788,lng:-90.5567321,title:'Marcador'}}
}

//,
