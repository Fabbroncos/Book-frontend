import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe  implements PipeTransform{
  transform(value: any, filterString: string, propName?: string) {
    
    if (value.length === 0 || filterString === "") {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (typeof(item) !== "object") {
        if (String(item).toLowerCase().includes(filterString.toLowerCase())){
          resultArray.push(item);
        }
      } else {
        if (!propName) {propName = "name"}
        if ( String(item[propName]).toLowerCase().includes(filterString.toLowerCase())) {
          resultArray.push(item);
        }
      }
      
    }
    return resultArray;
  }
}