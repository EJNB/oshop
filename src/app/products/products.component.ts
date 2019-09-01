import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent {
  products$;
  constructor(private productsService: ProductService) { 
    this.products$= productsService.getAll();
  }
}
