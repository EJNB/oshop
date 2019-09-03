import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { Category } from '../models/category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent {
  products: Product[];
  categories: Category[];
  constructor(
    route: ActivatedRoute,
    productsService: ProductService, 
    categoryService: CategoryService
  ) { 
    productsService.getAll().subscribe(p=> { this.products= p.map(this.mapToProducts) });
    categoryService.getAll().subscribe(p=> { this.categories= p.map(this.mapToCategories) })
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
