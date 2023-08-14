import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './paginas/login/login.component';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './componentes/menu/menu.component';
import { TopbarComponent } from './componentes/topbar/topbar.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { FacturaComponent } from './paginas/factura/factura.component';
import { ProductosComponent } from './paginas/productos/productos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { StockComponent } from './paginas/stock/stock.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorInterceptor } from './utils/interceptor.interceptor';
import { DataTablesModule } from "angular-datatables";
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { HistorialFacturasComponent } from './paginas/historial-facturas/historial-facturas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent, 
    MenuComponent,
    TopbarComponent,
    FooterComponent,
    FacturaComponent,
    ProductosComponent,
    StockComponent,
    UsuariosComponent,
    HistorialFacturasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    DataTablesModule,
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule
    
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

