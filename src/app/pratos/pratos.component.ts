import { Component, OnInit } from '@angular/core';
import { PratosService } from '../pratos.service';
import { RestaurantesService } from "../restaurantes.service";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

@Component({
  selector: 'app-pratos',
  templateUrl: './pratos.component.html',
  styleUrls: ['./pratos.component.css']
})
export class PratosComponent implements OnInit {

  public pratos: any = [];
  public restaurantes: any = [];
  public present = false;

  public nomePrato: string = '';
  public restauranteId: string = '';
  public valor: number = undefined;

  public editando: boolean = false;

  constructor(private pratosService: PratosService, private restaurantesService: RestaurantesService) {
    this.restaurantesService.getAll().subscribe(restaurantes => {
      this.restaurantes = restaurantes;
    });
   }

  public ngOnInit() {
    this.carregarPratos();
  }

  //carrega todos os pratos
  private carregarPratos(){
    this.pratosService.getAll().subscribe(pratos => {
      pratos.length > 0 ? this.present = true : this.present = false;
      this.pratos = pratos;
    });
  }

  //Adiciona ou altera um novo prato
  public newPrato(event){
    event.preventDefault();
    let prato = {
      nome: this.nomePrato,
      restaurante: this.restauranteId,
      valor: this.valor
    };
    if(!this.editando){
      this.pratosService.addPrato(prato)
        .subscribe((prato) => {
          this.resetarValores();
          this.carregarPratos();
        });
    }else{
      this.pratosService.updatePrato(prato)
        .subscribe((prato) => {
          this.resetarValores();
          this.carregarPratos();
          this.editando = false;
        });
    }
  }

  //Deleta um prato
  public deletar(id: string){
    if(confirm('Deseja remover esse prato?')){
      return this.pratosService.removePrato(id).subscribe(res => {
        alert("Removido.");
        this.carregarPratos();
      });
    }
  }

  public editar(prato: Object){
    this.editando = true;
    this.restauranteId = prato['restaurante']._id;
    this.nomePrato = prato['nome'];
    this.valor = prato['valor'];
  }

  private resetarValores(){
    this.nomePrato = '';
    this.valor = undefined;
    this.restauranteId = '';
  }

}
