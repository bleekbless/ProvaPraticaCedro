import { Prato } from "../../pratos/modelo/prato";
export class Restaurante {
 constructor(public nome: string, public pratos: Array<Prato>){}
}