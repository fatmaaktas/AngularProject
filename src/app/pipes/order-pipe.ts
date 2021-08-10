import { Pipe, PipeTransform } from "@angular/core";
@Pipe( {
name: 'orderBy'
} )
export class OrderByPipe implements PipeTransform {
    transform(array:any, orderBy:any, asc = true) {
        if (array != undefined) {
          if (!orderBy || orderBy.trim() == "") {
            return array;
          }
    
          //ascending
          if (asc) {
            return Array.from(array).sort((item1: any, item2: any) => {
              return this.orderByComparator(item1[orderBy], item2[orderBy]);
            });
          }
          else {
            //descending
            return Array.from(array).sort((item1: any, item2: any) => {
              return this.orderByComparator(item2[orderBy], item1[orderBy]);
            });
          }
        }
      }

      orderByComparator(a: any, b: any): number {

        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
          //Sayi degil ise
          if (a.toLowerCase() < b.toLowerCase()) return -1;
          if (a.toLowerCase() > b.toLowerCase()) return 1;
        }
        else {
          // string i sayiya cevir
          if (parseFloat(a) < parseFloat(b)) return -1;
          if (parseFloat(a) > parseFloat(b)) return 1;
        }
    
        return 0;
      }
}