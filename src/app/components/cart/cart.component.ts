import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/ICart';
import { loadCartsById } from 'src/app/store/actions';
import { IState } from 'src/app/store/reducers';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  subscribe!: Subscription;
  carts: Cart[] = []
  idCartSelect!: string;

  columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'status' },
    {
      field: 'Edit Cart',
      template: '<button (click)="onClick($event)"> Edit</button>',
      onCellClicked: (event) => this.onClick(event)
    }
  ];
  rowData!: Cart[];

  constructor(
    private store: Store<IState>,
    private router:Router
  ) {
    this.subscribe = this.store.select('userCartReducer').subscribe((res) => {
      console.log(res.userCart)
      if (res.userCart.length > 0) {
        var ids: string[];
        ids = res.userCart.map<string>((us) => us.cart_id);
        console.log("userCartREducer")
        this.assingCart(ids)
      }

    })
  }

  ngOnInit(): void {
  }
  assingCart(ids:string[]) {
    this.store.dispatch(loadCartsById({cartId:ids}));
    this.subscribe = this.store.select('cartReducer').subscribe((res) => {
      if(res.carts.length >0){
        console.log(res.carts)
        this.carts = [...res.carts]
        this.rowData = [...this.carts]
      }
    })
  }

  onClick(event: any) { 
    this.router.navigate([`/products-list/${event.data.id}`])
  }
}
