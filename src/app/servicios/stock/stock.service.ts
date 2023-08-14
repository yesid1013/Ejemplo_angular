import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  url ='http://192.168.0.101:5000/';
  constructor(private http: HttpClient) { }

  stock_productos(){
    // const token = localStorage.getItem('token')
    // const headers = new HttpHeaders().set('Authorization',`Bearer ${token}` ) 
    // return this.http.get(`${this.url}stock_local/1`,{headers: headers});
    return this.http.get(`${this.url}stock_local`);
  }
  stock_productos_borrados(){
    return this.http.get(`${this.url}stock_local_borrado`);
  }

  agregar_producto(producto:any):Observable<any>{
    return this.http.post(`${this.url}add_stockDet`,producto);
  }

  editar_producto(id_stock_det:number,cantidad:any){
    return this.http.put(`${this.url}actualizar_stock/${id_stock_det}`,cantidad);
  }

  eliminar_producto(id_stock_det:number){
    return this.http.delete(`${this.url}eliminar_producto/${id_stock_det}`);
  }

  restaurar_producto(id_stock_det:number){
    return this.http.delete(`${this.url}restaurar_producto/${id_stock_det}`);
  }

}
