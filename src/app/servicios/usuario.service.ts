import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  url ='http://127.0.0.1:5000/';

  constructor(private http: HttpClient) { }

  login(usuario:any):Observable<any>{
    return this.http.post(`${this.url}login`,usuario);
  }

  registro(usuario:any):Observable<any>{
    return this.http.post(`${this.url}registro`,usuario);
  }

  insertar_usuario(usuario:any):Observable<any>{
    return this.http.post(`${this.url}add_user`,usuario);
  }

  listar_usuarios(){
    return this.http.get(`${this.url}listar_usuarios`);
  }


  
  listar_usuarios_borrados(){
    return this.http.get(`${this.url}listar_usuarios_borrados`);
  }

  editar_usuario(id_user:number,usuario:any){
    return this.http.put(`${this.url}actualizar_usuario/${id_user}`,usuario);
  }

  eliminar_usuario(id_user:number){
    return this.http.delete(`${this.url}eliminar_usuario/${id_user}`);
  }

  restaurar_usuario(id_user:number){
    return this.http.delete(`${this.url}restaurar_usuario/${id_user}`);
  }


}
