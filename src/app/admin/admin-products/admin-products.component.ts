import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styles: []
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) { 
    this.subscription= productService.getAll()
    .subscribe(products=> this.filteredProducts= this.products = products.map(this.mapToProduct));    
  }
  
  ngOnInit() {}

  filter(query: string) {
    this.filteredProducts= query ? 
      this.products.filter(product=> product.title.toLowerCase().includes(query.toLowerCase())): 
      this.products; 
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe;
  }

  private mapToProduct = product=> {    
    let {key}= product;
    return { key,...product.payload.val() };    
  }

}
