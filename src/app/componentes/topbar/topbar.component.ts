import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

  constructor (private router : Router ){}

  logOut(){
    Swal.fire({
      title: '¿Estas seguro de cerrar sesión?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Sesión finalizada',
          showConfirmButton: false,
          timer: 1500
        });
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('cargo');
        localStorage.removeItem('nombre');
        localStorage.removeItem('apellido');
        this.router.navigate(['/']);
      }
    })
    
  }

}
