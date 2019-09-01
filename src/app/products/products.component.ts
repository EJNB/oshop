import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent {
  products$;
  categories$;
  constructor(private productsService: ProductService, categoryService: CategoryService) { 
    this.products$= productsService.getAll();
    this.categories$= categoryService.getAll();
  }
}
