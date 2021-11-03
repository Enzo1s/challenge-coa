import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { from, Observable, Subject } from 'rxjs';
import { UserCart } from 'src/app/models/IUserCart';
import { createCart } from 'src/app/store/actions';
import { IState } from 'src/app/store/reducers';
import { PublicService } from '../public.service';

@Injectable({
  providedIn: 'root'
})
export class UserCartService {

  private userCart!: UserCart;
  private userCart$ = new Subject<UserCart>();

  constructor(private _publicService: PublicService, private store: Store<IState>) { }

  getUserCarId(id: string): Observable<UserCart> {
    return this._publicService.getId(id,'user_cart');
  }

  getCartByIdUser(id: string): Observable<UserCart[]>{
    return this._publicService.getTerm(id,'user_id','user_cart')
  }

  postUserCart(userCart: UserCart): Observable<UserCart> {
    let id!:string;
    from(this.readId(userCart)).subscribe(
      (res: string) => {
        id = res
      }, (error) => console.log(error)
    )
    return this.getUserCarId(id)
  }

  createUserCart(userId: string): Observable<UserCart> {
    
    this.store.dispatch(createCart({cart: {id:'',status:"pending"}}));
    this.store.select('cartReducer').subscribe((res)=> {
      if(res.cart != null){
        this.userCart = {user_id: userId, cart_id: res.cart.id}
        this.postUserCart(this.userCart);
      }
    })
    this.userCart$.next(this.userCart)
    return this.userCart$.asObservable();
  }

  private async readId(userCart: UserCart){
    const res = await this._publicService.post<UserCart>(userCart, 'user_cart')
    let id: string = res['_delegate']['_key']['path']['segments'][1];
    return id;
  }
}
