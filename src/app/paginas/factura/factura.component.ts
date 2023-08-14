import { Component,OnInit,TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validator, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FacturaService } from 'src/app/servicios/factura/factura.service';
import { ProductosService } from 'src/app/servicios/productos/productos.service';
import { StockService } from 'src/app/servicios/stock/stock.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  
  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false,
  };

  constructor (private fb: FormBuilder,private modalService: BsModalService, private sfactura : FacturaService, private sstock : StockService ) {}

  ngOnInit(): void {
    this.listar_clientes();
    this.listar_productos();
  }



  formularioFact : FormGroup = this.fb.group({
    documento : this.fb.control('',[Validators.required]),
    producto : this.fb.control('',[Validators.required]),
    cantidad : this.fb.control(1,[Validators.required])

  });

  formcliente : FormGroup = this.fb.group({
    num_documento : this.fb.control('',[Validators.required]),
    nombre : this.fb.control('',[Validators.required]),
    apellido : this.fb.control('',[Validators.required]),
    telefono : this.fb.control('',[Validators.required]),
    email : this.fb.control('',[Validators.required,Validators.email])

  });

  //AGREGAR EN TABLA DE FACTURA
  factura: any[] = [];
  nombre_productos: any[] = []; //Nombre de los productos
  precio_unitario: any[] = []; //precio_unitario de los productos
  public selectedProductId: string  = "";
  public selectedProductName: string = "";

  agregarFactura() {
    this.factura.push(this.formularioFact.value);
    // console.log(this.factura[0].documento)
    // this.formularioFact.reset();
    let selectedProduct = null;
    const lastPerson = this.factura[this.factura.length - 1];
    const producto = lastPerson.producto;
    for (let i = 0; i < this.listaproductos.length; i++) {
      if (this.listaproductos[i].Id_producto == producto) {
        selectedProduct = this.listaproductos[i];
        break;
      }
    }
    if (selectedProduct) {
      // this.selectedProductName = selectedProduct.Nombre;
      this.nombre_productos.push(selectedProduct.Nombre);
      this.precio_unitario.push(selectedProduct.Precio);
    } else {
      this.selectedProductName = "null";
    }
  }

  eliminarFactura(posicion:number){
    this.factura.splice(posicion,1);// posicion, cantidad de elementos
    this.nombre_productos.splice(posicion,1);
    this.precio_unitario.splice(posicion,1);
  }

  newcliente = {
    num_documento : null,
    nombre : null,
    apellido : null,
    telefono : null,
    email : null
  }

  insertar_cliente(value : any){
    this.newcliente = {
      num_documento : value.num_documento,
      nombre : value.nombre,
      apellido : value.apellido,
      telefono : value.telefono,
      email : value.email
    }

    this.sfactura.agregar_cliente(this.newcliente).subscribe(datos=>{
      this.modalRef?.hide();
      Swal.fire({
        icon: 'success',
        title: 'Servicio exitoso',
        text: 'Cliente creado',
      });
    })
  };

  lista_clientes: any;
  listar_clientes(){
    this.sfactura.listar_clientes().subscribe(datos=>{
      this.lista_clientes = datos;
    })
  };

  listaproductos : any;
  listar_productos(){
    this.sstock.stock_productos().subscribe(datosproducts=>{
      this.listaproductos = datosproducts;
    })

  }

  

  factEnc ={
    id_cliente : null,
    precio_total : 0,
  };

  precio : number = 0;
  precio_totaly : number =0;
  generarFactura(){
    for (let i = 0; i < this.factura.length; i++) {
      this.precio = this.factura[i].cantidad * this.precio_unitario[i]
      this.precio_totaly += this.precio;   
    }
    this.factEnc = {
      id_cliente : this.formularioFact.value.documento,
      precio_total : this.precio_totaly
    };
    this.sfactura.insertar_factEnc(this.factEnc).subscribe(datos => {
      this.insertarFactDet()
    });
    
    
  };

  

  factDet = {
    id_producto : null,
    precio : null,
    cantidad : null
  }
  insertarFactDet(){
    
    for (let i = 0; i < this.factura.length; i++) {
      this.factDet = {
        id_producto : this.factura[i].producto,
        precio : this.precio_unitario[i],
        cantidad : this.factura[i].cantidad
      };
      this.sfactura.insertar_factDet(this.factDet).subscribe(data => {
      });
    };
    Swal.fire({
      icon: 'success',
      title: 'Factura Realizada',
      showConfirmButton: false,
      timer: 1500
    });
    this.formularioFact.reset();
    this.factura.splice(0, this.factura.length);
    this.precio_unitario.splice(0, this.precio_unitario.length);
    this.nombre_productos.splice(0, this.nombre_productos.length);

  }


  precio_totall(){
    
}
  


  

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }




  
}
