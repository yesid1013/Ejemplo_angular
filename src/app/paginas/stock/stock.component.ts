import { Component, OnInit, TemplateRef, OnDestroy, AfterViewInit,ViewChild   } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup,Validator, Validators } from '@angular/forms';
import { StockService } from 'src/app/servicios/stock/stock.service';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})

export class StockComponent implements OnInit, OnDestroy, AfterViewInit{
  dtTrigger: Subject<any> = new Subject;

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false,
  };

  formStock : FormGroup = this.fb.group({
    cantidad : this.fb.control('',[Validators.required, Validators.min(1)]),
    tipo : this.fb.control('',[Validators.required]),
    newcantidad : this.fb.control('',[Validators.required, Validators.min(1)]),
  });

  

  constructor(private modalService: BsModalService, private fb: FormBuilder, public stock: StockService) {}
  dtOptions: ADTSettings = {};

  lista_stock: any;
  lista_stock_borrados: any;
  ngOnInit() {
    this.stock_productos();
    this.stock_productos_borrados();
    this.dtOptions = {
      language:{url:'//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json'}      
    };
  }

  stock_productos(){
    this.stock.stock_productos().subscribe(datos=>{
      this.lista_stock=datos;
      this.dtTrigger.next(null);
    })
  }

  stock_productos_borrados(){
    this.stock.stock_productos_borrados().subscribe(datos=>{
      this.lista_stock_borrados=datos;
    })
  }

  nuevacantidad={
    cantidad:null
  }

  editar_producto(value : any,id_stock_det:number){
    this.nuevacantidad={
      cantidad : value.newcantidad
    }

    this.stock.editar_producto(id_stock_det,this.nuevacantidad).subscribe(datos=>{
      console.log(datos);
      this.modalRef?.hide();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => { //Renderizar datatable
        dtInstance.destroy();
        this.stock_productos();
      });
      Swal.fire({
        icon: 'success',
        title: 'Servicio exitoso',
        text: 'Producto Editado',
      });
      this.formStock.reset();
    })
  }

newstockdet ={
  id_producto : null,
  cantidad : null,
  }

  agregar_producto(value:any){

    this.newstockdet={
      id_producto : value.tipo,
      cantidad : value.cantidad,
    }
  
    this.stock.agregar_producto(this.newstockdet).subscribe(datos=>{
      console.log(datos);
      this.modalRef?.hide();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.stock_productos();
      });
      Swal.fire({
        icon: 'success',
        title: 'Servicio exitoso',
        text: 'Producto insertado',
      })
      this.formStock.reset();
    })    
  }


  eliminar_producto(id_stock_det:number){
    Swal.fire({
      title: '¿Estas seguro de eliminar este producto?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.stock.eliminar_producto(id_stock_det).subscribe(datos=>{
          console.log(datos);
          Swal.fire('Eliminado!', '', 'success');
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.stock_productos();
            this.stock_productos_borrados();
          });
        })

      } else if (result.isDenied) {
        Swal.fire('Producto no eliminado', '', 'info')
      }
    })
  }
 
 restaurar_producto(id_stock_det:number){
    Swal.fire({
      title: '¿Estas seguro de restaurar este producto?',
      showDenyButton: true,
      confirmButtonText: 'Restaurar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.stock.restaurar_producto(id_stock_det).subscribe(datos=>{
          console.log(datos);
          Swal.fire('Restaurado!', '', 'success');
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.stock_productos();
            this.stock_productos_borrados();
          });
        })

      } else if (result.isDenied) {
        Swal.fire('Producto no eliminado', '', 'info')
      }
    })
  }

  openModal2(template: TemplateRef<any>, con_edi : any) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    this.formStock.setValue({
      newcantidad :con_edi['Cantidad'],
      cantidad : "",
      tipo : ""
    })
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
