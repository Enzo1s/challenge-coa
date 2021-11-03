import { Injectable } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { Cart } from 'src/app/models/ICart';
import { PrivateService } from '../private.service';
import { PublicService } from '../public.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartRes = new Subject<Cart>();
  constructor(
    private _publicService: PublicService,
    private _privateService: PrivateService
  ) { }

  getIdCart(id: string): Observable<Cart> {
    return this._publicService.getId<Cart>('carts', id)
  }

  getCartIdandStatus(id: string, status: string): Observable<Cart[]>{
    return this._publicService.getTermTerm(id,status,'id','status','carts')
  }

  getCartsId(ids:string[]): Observable<Cart[]>{
    return this._publicService.getTermIn(ids,'id','carts')
  }

  postCart(cart: Cart): Observable<Cart> {
    this.assingId(cart);
    return this.cartRes.asObservable();
  }

  updateCart(cart: Cart, id: string): Observable<Cart> {
    return from(this._publicService.update<Cart>(cart, id, 'carts'));
  }

  private async assingId(cart: Cart){
    const res = await this._privateService.post<Cart>(cart, 'carts')
    let id = res['_delegate']['_key']['path']['segments'][1];
    let newCart: Cart = {id: id, status: cart.status}
    this.cartRes.next(newCart)
  }
}
