import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validator, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  miformulario:FormGroup
  modalRef?: BsModalRef;


  formRegistro : FormGroup = this.fb.group({
    nombre : this.fb.control('',[Validators.required]),
    apellido : this.fb.control('',[Validators.required]),
    correo : this.fb.control('',[Validators.required,Validators.email]),
    password : this.fb.control('',[Validators.required]),
    validarPassword : this.fb.control('',[Validators.required])

  },{ validator: this.validarContrasenas });

  validarContrasenas(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const validarPassword = formGroup.get('validarPassword')?.value;

    if (password !== validarPassword) {
      formGroup.get('validarPassword')?.setErrors({ noCoincide: true });
    } else {
      formGroup.get('validarPassword')?.setErrors(null);
    }
  }
  

  constructor (private fb: FormBuilder, private ulogin: UsuarioService,public router: Router,private modalService: BsModalService) {
    this.miformulario= this.fb.group({
      usuario : ['',[Validators.required, Validators.email]],
      password : ['',[Validators.required]]
  })

  
}

newlogin={
  usuario:null,
  password:null,
}

login(value:any){
  this.newlogin={
    usuario:value.usuario,
    password:value.password
  }

this.ulogin.login(this.newlogin).subscribe(datos_user=>{
  this.router.navigateByUrl('/dashboard');
  localStorage.setItem('token',datos_user.token);
  localStorage.setItem('cargo',datos_user.cargo);
  localStorage.setItem('id',datos_user.usuario_id);
  localStorage.setItem('nombre',datos_user.nombre);
  localStorage.setItem('apellido',datos_user.apellido);
  Swal.fire({
    icon: 'success',
    title: 'Inicio de sesion exitoso',
    text: 'Bienvenido '+localStorage.getItem('nombre') + ' '+localStorage.getItem('apellido'),
  });

},(error : HttpErrorResponse) => {
  console.log(error.error.message);
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
  
});

}
openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
}


newregistro ={
  nombre : null,
  apellido: null,
  correo : null,
  password : null

}

registro(value : any){
  this.newregistro = {
    nombre : value.nombre,
    apellido : value.apellido,
    correo : value.correo,
    password : value.password
  }

  this.ulogin.registro(this.newregistro).subscribe(datos => {
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'Se ha registrado correctamente ',
    });
    this.modalRef?.hide();

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





}
