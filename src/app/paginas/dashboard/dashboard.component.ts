import { Component,TemplateRef,ViewChild,OnInit,OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup,Validator, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  dtTrigger: Subject<any> = new Subject;
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  config = {
    backdrop: true,
    ignoreBackdropClick: false,
  };  

  constructor (private fb: FormBuilder,private modalService: BsModalService,private sproducto : ProductosService,private http: HttpClient) {
  }

  
  

  dtOptions: ADTSettings = {};

  formVehiculos : FormGroup = this.fb.group({
    placa : this.fb.control('',[Validators.required]),
    tipo : this.fb.control('',[Validators.required]),
    marca : this.fb.control('',[Validators.required]),
    MotivoIngreso : this.fb.control('',[Validators.required]),
    documento : this.fb.control(null,[Validators.required])

  });

  lista_vehiculos: any;
  ngOnInit(): void {
    this.obtener_vehiculos();
    this.dtOptions = {
      language:{url:'//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json'}      
    };
  }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  modalRef?: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  obtener_vehiculos(){
    this.sproducto.listar_vehiculos().subscribe(datos=>{
      this.lista_vehiculos = datos;
      this.dtTrigger.next(null);

    })
  }
  
  newproducto ={
    placa : null,
    tipo : null,
    marca : null,
    motivoIngreso : null,
    documento : null
  }

  onFileChange(event: Event) {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files && fileInput.files.length > 0 ? fileInput.files[0] : null;
  this.formVehiculos.patchValue({
    documento: file ? file.name : null,
  });
}

  ingresar_vehiculo(value:any){
    Swal.fire({
      title: '¿Estas seguro de ingresar este vehiculo?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
        this.newproducto={
          placa : value.placa,
          tipo : value.tipo,
          marca : value.marca,
          motivoIngreso : value.MotivoIngreso,
          documento: this.formVehiculos.get('documento')!.value
        }
    
        this.sproducto.Ingresar_vehiculo(this.newproducto).subscribe(datos=>{
          Swal.fire({
            icon: 'success',
            title: 'Servicio exitoso',
            text: 'Vehiculo ingresado',
          });
          this.modalRef?.hide();
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  //Renderizar datatable
            dtInstance.destroy();
            this.obtener_vehiculos();
          });
    
        },(error : HttpErrorResponse) => { 
          if (error.error.message){
            
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.error.message,
            });
          } else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ha oucrrido un error inesperado',
            })
          }
        }
        )

      }
    })

    
  }
}
 