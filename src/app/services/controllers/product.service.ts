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
    private publicService: PublicService,
    private privateService: PrivateService
    ) { }

  getAllProduct(): Observable<Product[]> {
    return this.publicService.get<Product>('products')
  }

  postProduct(product: Product): Observable<Product> {
    return from(this.privateService.post<Product>(product, 'products'));
  }
}
