import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styles: []
})
export class ProductCardComponent {
  @Input() product: Product;

  constructor() { }
}
