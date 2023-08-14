import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url ='http://127.0.0.1:5000/';


  constructor(private http: HttpClient) { }

  agregar_producto(producto:any):Observable<any>{
    return this.http.post(`${this.url}agregar_producto`,producto);
  }

  Ingresar_vehiculo(vehiculo:any):Observable<any>{
    return this.http.post(`${this.url}ingresar_vehiculo`,vehiculo);
  }
  
  listar_vehiculos(){
    return this.http.get(`${this.url}listar_vehiculos`);
  }

  get_productos(){
    return this.http.get(`${this.url}obtener_productos`);
  }

  editar_producto(id_producto:number,producto:any){
    return this.http.put(`${this.url}actualizar_producto/${id_producto}`,producto);
  }

  eliminar_producto(id_producto:number){
    return this.http.delete(`${this.url}eliminar_product/${id_producto}`);
  }

  restaurar_producto(id_producto:number){
    return this.http.delete(`${this.url}restaurar_product/${id_producto}`);
  }

  get_productos_borrados(){
    return this.http.get(`${this.url}get_productos_borrados`);
  }
}
