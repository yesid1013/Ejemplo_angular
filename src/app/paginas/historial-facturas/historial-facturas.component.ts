import { AfterViewInit, Component,OnDestroy,OnInit,ViewChild,TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { FacturaService } from 'src/app/servicios/factura/factura.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';





@Component({
  selector: 'app-historial-facturas',
  templateUrl: './historial-facturas.component.html',
  styleUrls: ['./historial-facturas.component.css']
})
export class HistorialFacturasComponent implements OnInit, OnDestroy, AfterViewInit {
  dtTrigger: Subject<any> = new Subject;

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false,
  };  

  constructor (private sfactura : FacturaService,private modalService: BsModalService){}
  dtOptions: ADTSettings = {};

  ngOnInit(): void {
    this.dtOptions = {
      language:{url:'//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json'}
    };
    this.facturas_enc();
  }

  lista_facturas_enc: any;
  facturas_enc(){
    this.sfactura.listar_facturaEnc().subscribe(datos =>{
      this.lista_facturas_enc = datos;
      this.dtTrigger.next(null);
    })
  };

  lista_facturas_det : any;
  facturas_det(id_fac_en :number,template: TemplateRef<any>){
    this.sfactura.listar_facturaDet(id_fac_en).subscribe(datos =>{
      console.log(datos);
      this.lista_facturas_det = datos;
    });
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
