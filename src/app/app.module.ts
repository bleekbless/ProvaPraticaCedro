import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

//Servicess
import { RestaurantesService } from "./restaurantes.service";
import { PratosService } from "./pratos.service";

import { AppComponent } from './app.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { HomeComponent } from './home/home.component';
import { PratosComponent } from './pratos/pratos.component';
import { BuscarPipe } from './buscar.pipe';
import { ModalRestauranteComponent } from './modal-restaurante/modal-restaurante.component';

//Definir Rotas
const ROUTES = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'restaurantes',
    component: RestaurantesComponent
  },
  {
    path: 'pratos',
    component: PratosComponent
  },
  {
    path: 'pratos/restaurantes',
    redirectTo: 'restaurantes'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RestaurantesComponent,//Restaurantes Component
    HomeComponent,//Home Component
    PratosComponent, BuscarPipe, ModalRestauranteComponent //Pratos Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [RestaurantesService, PratosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
