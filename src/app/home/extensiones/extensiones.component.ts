import { Component, OnInit } from '@angular/core';
import { ExtensionService } from '../../services/extension.service';
import { Extension } from '../../common/interfaces/extension.interfaces';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { MENSAJES } from '../../common/enums';
import jsPDF from 'jspdf'
import  autoTable, { Color, Styles } from 'jspdf-autotable'

import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver';

interface Column{
  field: string,
  header:string,
  customExportHeader?: string
}


interface ExportColumn{
  title: string,
  dataKey: string;
}




@Component({
  selector: 'app-extensiones',
  templateUrl: './extensiones.component.html',
  styles: ``
})
export class ExtensionesComponent implements OnInit {
  extensiones?: Extension[];
  cols!: Column[]
  exportColumns!: ExportColumn[];

  constructor(
    private _extensionService: ExtensionService,
    private _router: Router,
    private _dataService: DataService
    ){


      this.cols = [
        {field:'extension',header:'Extensión'},
        {field:'puesto_departamento',header:'Puesto/Departamento'},
        {field:'nombre',header:'Nombre'},
        {field:'correo',header:'Correo'},
        
      ]


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

  
  exportXlsx(){
    const woksheet = xlsx.utils.json_to_sheet(this.extensiones!);
    const workbook = {Sheets:{data:woksheet},SheetNames:['data']};
    const excelBuffer = xlsx.write(workbook,{bookType:'xlsx',type:'array'})
    this.saveFile(excelBuffer,'reporte');
     
  }
  
  
  exportPdf(){

    let maring = 10
      
   let extExport = this.extensiones?.map(e=>{
    return {'extension':e.extension,
    puesto_departamento:e.puesto_departamento,
    nombre: e.nombre,
    correo:e.correo,

  }
    });

    let headers = this.cols.map(e =>{ return { dataKey: e.field, header: e.header }  })
    const columnStyles  = {extension:{ halign:'center'  }}
   let doc = new jsPDF({
    orientation:'p',
    //ormat:'latter',
    unit: 'mm'
   });

   let pageWidth = doc.internal.pageSize.width
   let pageHeight = doc.internal.pageSize.height;
   let center = pageWidth/2;
   
   let alignX = (text: string)=>{
    return doc.getTextWidth(text)
   }
   //let alignX = doc.getTextWidth('Reporte de extensiones') - maring;

   //console.log(center-(alignX/2));
   doc.setFontSize(24)
   doc.setTextColor('green');
   doc.text('Reporte de extensiones',center-(alignX('Reporte de extensiones')/2),10);
   doc.setFontSize(12)
   doc.text('Tabla de extensiones',center-(alignX('Tabla de extensiones')/2),20);
   
   doc.setDrawColor(0);
   doc.setFillColor(255,255,255);
   doc.roundedRect(maring,25,pageWidth-maring*2,20,5,5,"FD")
   doc.setTextColor('black')
   doc.setFontSize(11)
   doc.text(`Fecha: ${new Date().toISOString()}`,maring + 3 , 30);
   doc.text(`Usuario: Sherwin Gonzalez`, 100,30);
   //console.log('cols', extExport)
   //doc.autoTable(doc,{body:extExport , columns:this.cols,});

   autoTable(doc,{
    startY:60,
    margin:{left:maring },  
    body:extExport, 
    columns: headers,
    columnStyles:{
      extension:{fontSize:8, valign:'middle'  },
      puesto_departamento:{fontSize:8, valign:'middle'},
      nombre:{fontSize:8,valign:'middle'},
      correo:{fontSize:8,valign:'middle'}
    },
    headStyles:{
      halign:'left',
      fontSize:8,
      fillColor:[ 133, 193, 233 ]
    }  
     });
   doc.save('extensinoes.pdf')

      /* import('jspdf-autotable')
      .then((autoTable)=>{
        const doc = new jsPDF.default('p','px','latter');
        doc.save('exteniones.pdf')
        //(doc as any).autoTable(this.)
      }) */
    
  }
  /* editar(id: string) {
      this._router.navigate(['/edit',id])
  } */

  saveFile(buffer: any, fileName:string){
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx'
    const data:Blob = new Blob([buffer],{type:EXCEL_TYPE});

    saveAs(data,`${fileName}${EXCEL_EXTENSION}`);
  }
}
