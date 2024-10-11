import {Component, inject} from '@angular/core';
import {combineLatest, concatAll, map, Observable, switchMap, tap} from 'rxjs';
import {Product} from '../../models/product';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Observable<Product[]> = inject(ActivatedRoute).data.pipe(map(({products}) => products))
  private service = inject(ProductService)
  /*private http = inject(HttpClient)
  dummyImport() {
    this.http.get<{products : any[] }>('https://dummyjson.com/products').pipe(map(({products}) => {
      return products.map(({title, price, rating, images}) => {
        return this.service.save({id: 0, name: title, price: price, rating: rating, src: images[0]})
      })
    }), switchMap(r => r), concatAll()).subscribe()
  }*/
  delete(id: number) {
    this.service.delete(id).subscribe(() => this.products = this.service.all())
  }
}
