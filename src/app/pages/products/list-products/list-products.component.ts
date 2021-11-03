import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/ICart';
import { ProductCart } from 'src/app/models/IProductCart';
import { Product } from 'src/app/models/Iproducts';
import { createProductCart, loadCartIdStatus, loadProductCartByIds, loadProducts, loadProductsCarts, uploadProductCart } from 'src/app/store/actions';
import { IState } from 'src/app/store/reducers';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  subscribe!: Subscription;
  products: Product[] = [];
  productsCart: ProductCart[] = [];
  cart!: Cart;
  idCart!: string;

  columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'name' },
    { field: 'price' },
    { field: 'description' },
    {
      field: 'Add Cart',
      template: '<button (click)="onClick($event)">+ Cart</button>',
      onCellClicked: (event) => this.onClick(event)
    }
  ];
  rowData!: Product[];

  constructor(
    private Store: Store<IState>,
    private route: ActivatedRoute
  ) {
    this.Store.dispatch(loadProducts());
    this.subscribe = this.Store.select('productReducer').subscribe((res) => {
      if (res.products.length > 0) {
        this.products = [...res.products]
        this.assignProduct()
      }
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        if (params['id']) {
          this.idCart = params["id"]
          this.loadProductCart()
        }
      }
    ).unsubscribe()
  }

  loadProductCart() {
    this.Store.dispatch(loadProductsCarts({ cartId: this.idCart }))
    this.Store.select('productCartReducer').subscribe((res) => {
      if (res.productCarts.length > 0) {
        this.productsCart = [...res.productCarts]
      }
    })
  }

  assignProduct() {
    this.rowData = [...this.products];
  }

  onClick($event: any) {
    console.log(this.productsCart)
    var isPresent: number = this.productsCart.findIndex((pc) => pc.product_id === $event.data.id);
    if (isPresent < 0) {
      console.log("crear carrito")
      let productCart: ProductCart = { cart_id: this.idCart, product_id: $event.data.id, quantity: 1 }
      this.Store.dispatch(createProductCart({ productCart }))
    } else {
      const productCart: ProductCart = {
        cart_id:this.productsCart[isPresent].cart_id,
        product_id: this.productsCart[isPresent].product_id,
        quantity: this.productsCart[isPresent].quantity+1,
      }
      console.log("update carro")
      console.log(productCart)
      this.Store.dispatch(loadProductCartByIds({cartId:productCart.cart_id,productId:productCart.product_id}));
      this.Store.select('productCartReducer').subscribe((res) => {
        if(res.productCarts != null){
          console.log(res.productCart)//se repite mucho desuscribirse
        }
      })
    }
  }

  loadCart() {
    this.Store.select('userCartReducer').subscribe((res) => {
      if (res.userCart.length != 0) {
        let id = res.userCart[0].cart_id;
        this.Store.dispatch(loadCartIdStatus({ cartId: id, status: 'pending' }));
      }
    })
  }

}
