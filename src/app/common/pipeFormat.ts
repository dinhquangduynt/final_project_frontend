import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'pipeFormat'
})
export class pipeFormat implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value + 'VND';
  }
}
