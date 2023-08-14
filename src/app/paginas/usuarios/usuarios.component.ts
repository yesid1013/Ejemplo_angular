import { Component,OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup,Validator, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false,
  };

  constructor(private modalService: BsModalService, private fb: FormBuilder, private susuario : UsuarioService ) {}

  formUsers : FormGroup = this.fb.group({
    num_documento : this.fb.control('',[Validators.required, Validators.min(1)]),
    nombre : this.fb.control('',[Validators.required]),
    apellido : this.fb.control('',[Validators.required]),
    email : this.fb.control('',[Validators.required,Validators.email]),
    password : this.fb.control('',[Validators.required]),
    cargo : this.fb.control('',[Validators.required,Validators.min(1),Validators.max(3)])

  });

  ngOnInit(): void {
    this.listar_usuarios(); 
    this.listar_usuarios_borrados();
  }


  lista_usuarios: any;
  lista_usuarios_borrados: any;

  listar_usuarios(){
    this.susuario.listar_usuarios().subscribe(datos=>{
      console.log(datos);
      this.lista_usuarios=datos;
    })
  };

  listar_usuarios_borrados(){
    this.susuario.listar_usuarios_borrados().subscribe(datos=>{
      console.log(datos);
      this.lista_usuarios_borrados=datos;
    })
  };

newusuario ={
  num_documento : null,
  nombre : null,
  apellido : null,
  email : null,
  password : null,
  cargo : null
  }

  insertar_usuario(value:any){
    this.newusuario = {
      num_documento : value.num_documento,
      nombre : value.nombre,
      apellido : value.apellido,
      email : value.email,
      password : value.password,
      cargo : value.cargo
    }

    this.susuario.insertar_usuario(this.newusuario).subscribe(datos=>{
      this.modalRef?.hide();
      Swal.fire({
        icon: 'success',
        title: 'Servicio exitoso',
        text: 'Usuario insertado',
      });
      this.listar_usuarios();
      this.formUsers.reset();

    })
  };

  edituser = {
    num_documento : null,
    nombre : null,
    apellido : null,
    email : null,
    password : null,
    cargo : null
  }

  editar_usuario(value : any, id_user : number){
    this.edituser = {
      num_documento : value.num_documento,
      nombre : value.nombre,
      apellido : value.apellido,
      email : value.email,
      password : value.password,
      cargo : value.cargo
    };

    this.susuario.editar_usuario(id_user,this.edituser).subscribe(datos=>{
      this.modalRef?.hide();
      this.listar_usuarios();
      this.formUsers.reset();
      Swal.fire({
        icon: 'success',
        title: 'Servicio exitoso',
        text: 'Usuario editado',
      });
      
    })
  };

  eliminar_usuario(id_user : number){
    Swal.fire({
      title: '¿Estas seguro de eliminar este usuario?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.susuario.eliminar_usuario(id_user).subscribe(datos=>{
          console.log(datos);
          Swal.fire('Usuario Eliminado!', '', 'success');
          this.listar_usuarios();
          this.listar_usuarios_borrados();
        })

      } else if (result.isDenied) {
        Swal.fire('Uusaario no eliminado', '', 'info')
      }
    })
  }

  restaurar_usuario(id_user : number){
    Swal.fire({
      title: '¿Estas seguro de restaurar este usuario?',
      showDenyButton: true,
      confirmButtonText: 'Restaurar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.susuario.restaurar_usuario(id_user).subscribe(datos=>{
          console.log(datos);
          Swal.fire('Usuario Restaurado!', '', 'success');
          this.listar_usuarios();
          this.listar_usuarios_borrados();
          
        })

      } else if (result.isDenied) {
        Swal.fire('Uusaario no eliminado', '', 'info')
      }
    })
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  openModal2(template: TemplateRef<any>, con_edi : any) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    this.formUsers.setValue({
      num_documento : con_edi['documento'],
      nombre : con_edi['nombre'],
      apellido : con_edi['apellido'],
      email : con_edi['email'],
      password : con_edi['password'],
      cargo : con_edi['cargo']
    })
  };

  cerrarModal(){
    this.modalRef?.hide();
    this.formUsers.reset()
  }



}
