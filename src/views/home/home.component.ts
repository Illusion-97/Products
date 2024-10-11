import {Component, inject} from '@angular/core';
import {ProductComponent} from './product/product.component';
import {defProduct, Product} from '../../models/product';
import {map, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  products: Observable<Product[]> = inject(ActivatedRoute).data.pipe(map(({products}) => products))
}
