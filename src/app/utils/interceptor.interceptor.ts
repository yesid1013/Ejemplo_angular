import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');

    if (token){
      request = request.clone({setHeaders: {Authorization : `Bearer ${token}`}})
    }

    return next.handle(request).pipe(
      catchError((error : HttpErrorResponse)=>{
        if (error.status === 401){
          this.router.navigate(['/']);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Acceso denegado",
          });
        }
        if (error.error.message){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message,
          });
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha oucrrido un error inesperado',
          })
        }
        return throwError(() => new Error('Error'))
      })
    );
  }
}
