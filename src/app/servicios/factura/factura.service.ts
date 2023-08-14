import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  url ='http://192.168.0.101:5000/';
 
  constructor(private http: HttpClient) { }

  agregar_cliente(cliente:any):Observable<any>{
    return this.http.post(`${this.url}agregar_cliente`,cliente);
  }

  listar_clientes(){
    return this.http.get(`${this.url}listar_clientes`);
  }

  insertar_factEnc(factEnc:any):Observable<any>{
    return this.http.post(`${this.url}insertar_factEncabezado`,factEnc);
  }

  insertar_factDet(factDet:any):Observable<any>{
    return this.http.post(`${this.url}insertar_facturaDet`,factDet);
  }

  listar_facturaEnc(){
    return this.http.get(`${this.url}facturas_en_local`);
  }

  listar_facturaDet(id_fac_enc : number){
    return this.http.get(`${this.url}facturasDet/${id_fac_enc}`);
  }


}
