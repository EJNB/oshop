import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent {
  products: Product[]= [];
  filteredProducts: Product[] = [];
  categories: Category[];
  category: string;

  constructor(
    route: ActivatedRoute,
    productsService: ProductService, 
    categoryService: CategoryService
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

    categoryService.getAll().subscribe(p=> { this.categories= p.map(this.mapToCategories) });
    
  }

  private mapToProducts = product=> {    
    let {key}= product;
    return { key,...product.payload.val() };    
  }

  private mapToCategories = category=> {    
    let {key}= category;
    return { key,...category.payload.val() };    
  }
}
