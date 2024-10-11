import { Injectable } from '@angular/core';
import {AbstractCRUDService} from '../tools/abstract-crudservice';
import {Product} from '../models/product';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends AbstractCRUDService<Product>{
  protected END_POINT: string = `${environment.API_URL}660/products`;

}
