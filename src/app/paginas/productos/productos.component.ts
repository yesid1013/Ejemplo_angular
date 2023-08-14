import { Component, OnInit, TemplateRef, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup,Validator, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import Swal from 'sweetalert2';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnDestroy, AfterViewInit {
  dtTrigger: Subject<any> = new Subject;

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false,
  };  

  formProducts : FormGroup = this.fb.group({
    modelo : this.fb.control('',[Validators.required]),
    nombre : this.fb.control('',[Validators.required]),
    precio : this.fb.control('',[Validators.required, Validators.min(1)]),
    tipo : this.fb.control('',[Validators.required])

  })


  constructor(private modalService: BsModalService,private fb: FormBuilder, private sproducto : ProductosService, private gproductos: ProductosService,private gproductos_borrados: ProductosService) {}
  dtOptions: ADTSettings = {};
  
  lista_productos: any;
  lista_productos_borrados: any;
  ngOnInit(): void {
    this.get_productos();
    this.get_productos_borrados(); 
    this.dtOptions = {
      language:{url:'//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json'}      
    };
  }

  
  get_productos(){
    this.gproductos.get_productos().subscribe(obtenido=>{
      this.lista_productos=obtenido;
      this.dtTrigger.next(null);
    })
    
  }
  
  get_productos_borrados(){
    this.gproductos_borrados.get_productos_borrados().subscribe(obtenido=>{
      this.lista_productos_borrados=obtenido;
    })
    
  } 

  


newproducto ={
  num_serie : null,
  nombre : null,
  tipo_producto : null,
  precio : null
}

agregar_producto(value:any){

  this.newproducto={
    num_serie : value.modelo,
    nombre : value.nombre,
    tipo_producto : value.tipo,
    precio : value.precio
  }

  this.sproducto.agregar_producto(this.newproducto).subscribe(datos=>{
    console.log(datos);
    Swal.fire({
      icon: 'success',
      title: 'Servicio exitoso',
      text: 'Producto insertado',
    });
    this.modalRef?.hide();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  //Renderizar datatable
      dtInstance.destroy();
      this.get_productos();
    });
  })

};

editproducto = {
  num_serie : null,
  nombre : null,
  tipo_producto : null,
  precio : null,
}

editar_product(value : any, id_producto : number){
  this.editproducto = {
    num_serie : value.modelo,
    nombre : value.nombre,
    tipo_producto : value.tipo,
    precio : value.precio,
  };

  this.sproducto.editar_producto(id_producto,this.editproducto).subscribe(datos=>{
    this.modalRef?.hide();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => { //Renderizar datatable
        dtInstance.destroy();
        this.get_productos();
      });
      Swal.fire({
        icon: 'success',
        title: 'Servicio exitoso',
        text: 'Producto Editado',
      });
      this.formProducts.reset()
  })

}

eliminar_producto(id_producto:number){
  Swal.fire({
    title: '¿Estas seguro de eliminar este producto?',
    showDenyButton: true,
    confirmButtonText: 'Eliminar',
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      this.sproducto.eliminar_producto(id_producto).subscribe(datos=>{
        console.log(datos);
        Swal.fire('Eliminado!', '', 'success');
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.get_productos();
          this.get_productos_borrados();
        });
      })

    } else if (result.isDenied) {
      Swal.fire('Producto no eliminado', '', 'info')
    }
  })
}


restaurar_producto(id_producto:number){
  Swal.fire({
    title: '¿Estas seguro de restaurar este producto?',
    showDenyButton: true,
    confirmButtonText: 'Restaurar',
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      this.sproducto.restaurar_producto(id_producto).subscribe(datos=>{
        console.log(datos);
        Swal.fire('Restaurado!', '', 'success');
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.get_productos();
          this.get_productos_borrados();
        });
      })

    } else if (result.isDenied) {
      Swal.fire('Producto no eliminado', '', 'info')
    }
  })
}


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  openModal2(template: TemplateRef<any>, con_edi : any) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    this.formProducts.setValue({
      modelo :con_edi['Num_serie'],
      nombre :con_edi['Nombre'],
      precio : con_edi['Precio'],
      tipo :  con_edi['Id_tipo_producto']
    })
  }

  cerrarModal(){
    this.modalRef?.hide();
    this.formProducts.reset()
  }

  ngAfterViewInit(): void {
  
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
