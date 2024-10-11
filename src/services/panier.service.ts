import {inject, Injectable} from '@angular/core';
import {AbstractCRUDService} from '../tools/abstract-crudservice';
import {Product} from '../models/product';
import {AuthService, User} from './auth.service';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PanierService extends AbstractCRUDService<any>{
  protected END_POINT: string = environment.API_URL + "panier";
  private readonly key: string = "PANIER"
  private auth = inject(AuthService)
  private products: Map<Product,number> = new Map<Product, number>()

  constructor() {
    super();
    const existing = sessionStorage.getItem(this.key)
    if(existing) {
      console.log(existing)
      this.products = JSON.parse(existing, (key,value) => {
        if(typeof value === 'object' && value !== null) {
          if (value.dataType === 'Map') {
            return new Map(value.value);
          }
        }
        return value;
      })
      console.log(this.products)
    }
  }

  has(product: Product) {
    return this.products.has(product)
  }

  get(product: Product) {
    return this.products.get(product)
  }

  set(product: Product, qty: number) {
    if(qty < 1 && this.has(product)) this.products.delete(product)
    else this.products.set(product,qty)
    sessionStorage.setItem(this.key, JSON.stringify(this.products, (key, value) => {
      if(value instanceof Map) {
        return {
          dataType: 'Map',
          value: Array.from(value.entries()), // or with spread: value: [...value]
        };
      } else {
        return value;
      }
    }))
  }

  get entries() {
    return this.products.entries()
  }

  validate() {
    if(this.auth.isLogged) {
      this.save({id: 0, user: this.auth.currentUser, products:this.products})
      this.products.clear()
    }
  }

}
export interface Panier {
  id: number,
  user: User,
  products: Map<Product, number>
}
