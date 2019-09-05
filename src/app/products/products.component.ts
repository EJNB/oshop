import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent {
  products: Product[]= [];
  filteredProducts: Product[] = [];
  category: string;

  constructor(
    route: ActivatedRoute,
    productsService: ProductService, 
  ) { 
    productsService
      .getAll()
      .pipe(
        switchMap(p=> { 
          this.products= p.map(this.mapToProducts);
          return route.queryParamMap;
        })
      )            
      .subscribe(params=> {
        this.category= params.get('category');//obtengo del queryParam el valor de la clave category
  
        this.filteredProducts = (this.category) ?
          this.products.filter(product=> product.category === this.category) :
          this.products; 
      });
  }

  private mapToProducts = product=> {    
    let {key}= product;
    return { key,...product.payload.val() };    
  }

  // private mapToCategories = category=> {    
  //   let {key}= category;
  //   return { key,...category.payload.val() };    
  // }
}
