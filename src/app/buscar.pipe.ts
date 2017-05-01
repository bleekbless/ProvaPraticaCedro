import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscar'
})
export class BuscarPipe implements PipeTransform {

  transform(data: any[], searchTerm: string): any[] {
      searchTerm = searchTerm.toUpperCase();
      return data.filter(item => {
        return item.nome.toUpperCase().indexOf(searchTerm) !== -1 
      });
  }

}
