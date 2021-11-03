import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ProductCart } from 'src/app/models/IProductCart';
import { PublicService } from '../public.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCartService {

  constructor(
    private _publicservice: PublicService
  ) { }

  getProductsCarts(cartId: string): Observable<ProductCart[]> {
    return this._publicservice.getTerm<ProductCart>(cartId,'cart_id','product_carts');
  }
  getByProductCart(cartId: string, productId:string): Observable<ProductCart[]> {
    return this._publicservice.getTermTerm<ProductCart>(cartId, productId,'cart_id','product_id','product_carts');
  }

  getProductCartId(id: string): Observable<ProductCart> {
    return this._publicservice.getId<ProductCart>(id, 'product_carts');
  }

  postProductCart(productCart: ProductCart): Observable<any> {
    return from (this._publicservice.post<ProductCart>(productCart, 'product_carts'))
    /* let id!:string;
    from(this.readId(productCart)).subscribe(
      (res: string) => {
        id = res
      }, (error) => console.log(error)
    );
    return this.getProductCartId(id); */
  }

  updateProductCart(productCart: ProductCart, id:string): Observable<ProductCart> {
    return from(this._publicservice.update(productCart,id, 'product:carts'));
  }

  private async readId(productCart: ProductCart){
    const res = await this._publicservice.post<ProductCart>(productCart, 'product_carts')
    let id: string = res['_delegate']['_key']['path']['segments'][1];
    return id;
  }
}
