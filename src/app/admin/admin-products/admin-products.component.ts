import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styles: []
})
export class AdminProductsComponent implements OnInit {
  products$;

  constructor(private productService: ProductService) { 
    this.products$= productService.getAll();
    productService.getAll().subscribe(p=> console.log(p));
    console.log(this.products$)
  }
  
  ngOnInit() {
  }

}
