import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { FacturaComponent } from './paginas/factura/factura.component';
import { HistorialFacturasComponent } from './paginas/historial-facturas/historial-facturas.component';
import { LoginComponent } from './paginas/login/login.component';
import { ProductosComponent } from './paginas/productos/productos.component';
import { StockComponent } from './paginas/stock/stock.component';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  {
    path : 'dashboard',
    component : DashboardComponent,
    canActivate : [AuthGuard]
  },
  {
    path : '',
    component: LoginComponent
  },
  {
    path : 'factura',
    component: FacturaComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'stock',
    component:StockComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'usuarios',
    component:UsuariosComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'historial_facturas',
    component : HistorialFacturasComponent,
    canActivate : [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
