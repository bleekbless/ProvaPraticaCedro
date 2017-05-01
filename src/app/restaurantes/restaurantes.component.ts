import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RestaurantesService } from "../restaurantes.service";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {
  
  @ViewChild('input')
  input: ElementRef;

  public restaurantes = []; //lista de restaurantes
  public present: boolean = false; //deve mostrar a mensagem?
  public nomeRestaurante: string; //nome do restaurante
  public editando: boolean = false; //esta editando um restaurante?

  constructor(private restaurantesService: RestaurantesService) { }

  ngOnInit() {
    this.carregarRestaurantes();

    let eventObservable = Observable.fromEvent(this.input.nativeElement, 'keyup');
    eventObservable.subscribe();
  }

  //Carrega todos os restaurantes
  private carregarRestaurantes(){
    this.restaurantesService.getAll().subscribe(restaurantes => {
      restaurantes.length > 0 ? this.present = true : this.present = false;
      this.restaurantes = restaurantes;
    });
  }

  //Adiciona um novo restaurante
  public addRestaurante(event){
    event.preventDefault();
    let newRestauraurante = { nome: this.nomeRestaurante };
    if(!this.editando){
      this.restaurantesService.addRestaurante(newRestauraurante)
        .subscribe((restaurante)=>{
          this.nomeRestaurante = '';
          this.carregarRestaurantes();
        });
    }else{
      this.restaurantesService.updateRestaurante(newRestauraurante)
        .subscribe((restaurante) =>{
          this.nomeRestaurante = '';
          this.carregarRestaurantes();
          this.editando = false;
        });   
    }
  }
  
  //Altera um restaurante existente
  public editar(restaurante: Object){
    this.editando = true;
    this.nomeRestaurante = restaurante['nome'];
  }

  //Remove um restaurante junto com todas seus relacionamentos
  public deletar(id:string){
    if(confirm('Deseja remover esse restaurante?')){
      return this.restaurantesService.removeRestaurante(id).subscribe(res => {
        alert("Removido.");
        this.carregarRestaurantes();
      });
    }
  }

}
