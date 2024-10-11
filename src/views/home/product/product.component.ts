import {Component, inject, Input} from '@angular/core';
import {Product} from '../../../models/product';
import {DecimalPipe} from '@angular/common';
import {PanierService} from '../../../services/panier.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [DecimalPipe, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input({required: true}) product!: Product
  protected panier = inject(PanierService)

  get stars() {
    return new Array(5)
      .fill(0)
      .map((v, i) => (i + 1) <= this.product.rating );
  }

}
