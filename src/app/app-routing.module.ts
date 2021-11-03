import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { ListProductsComponent } from './pages/products/list-products/list-products.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'products-list', component: ListProductsComponent},
  {path: 'products-list/:id',component: ListProductsComponent},
  {path: 'cart-list', component: CartComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
