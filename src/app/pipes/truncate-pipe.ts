import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone:true
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number = 100, trailing: string = '...'): string {

    if(!value || value.length <= limit) {
      return value;
    }
    return value.substring(0,limit) + trailing;
  }
}
