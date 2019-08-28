import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product= {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,//esto es pra obtner el id pasado por parametro en la ruta
    private categoryService: CategoryService,
    private productService: ProductService
  ) { 
    this.categories$ = categoryService.getCategories();
    this.id= this.route.snapshot.paramMap.get('id');
    if(this.id) 
      this.productService.get(this.id)
      /* con este operador tomaremos solo el primer item, de nuestro observable, y luego ese 
        observable automaticamente se completera, es decir execute complete method, por tanto no tenemos q decir
        explicitamente unsubscribe, por q este observable mo emitira un nuevo valor*/
        .pipe(take(1))
        .subscribe(p=> this.product= p);
  }

  ngOnInit() {
  }

  save(product) {
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
