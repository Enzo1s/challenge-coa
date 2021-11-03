import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Product } from 'src/app/models/Iproducts';
import { PrivateService } from '../private.service';
import { PublicService } from '../public.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _publicService: PublicService,
    private _privateService: PrivateService
  ) { }

  getAllProduct(): Observable<Product[]> {
    return this._publicService.get<Product>('products')
  }

  postProduct(product: Product): Observable<Product> {
    return from(this._privateService.post<Product>(product, 'products'));
  }
}
