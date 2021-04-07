import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'editUser'
})
export class EditUserPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
