import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isimFilter'
})
export class IsimFilterPipe implements PipeTransform {

  transform(value: any, isimFilter: any): any {
    if(!value)return null;
    if(!isimFilter)return value;

    isimFilter =isimFilter.toLowerCase();

    return value.filter(function(data:any){
        return JSON.stringify(data).toLowerCase().includes(isimFilter);
    });
}

}
