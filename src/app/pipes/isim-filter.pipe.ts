import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isimFilter'
})
export class IsimFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
