import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'searchPro'
})
export class SearchProPipe implements PipeTransform {

  transform(allProducts: Product[] = [], val: string = ''): any {
    if (!val.trim()) {
      return allProducts;
    }

    return allProducts.filter((item: Product) =>
      item?.['name']?.toUpperCase().includes(val.toUpperCase())
    );
  }
}
