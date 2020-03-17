import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchItem',
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (args.toString().length < 3) {
      return value;
    }
    if (!value) {
      return null;
    }
    if (!args) {
      return value;
    }

    args = args.toLowerCase();
    const data = value.filter((item) => {
      return item.title.toLowerCase().includes(args);
    });
    return data.length > 0 ? data : null;
  }
}
