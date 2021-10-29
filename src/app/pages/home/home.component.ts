import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Iproducts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Observable<Product[]>;

  constructor(firestore: AngularFirestore) { 
    this.products = firestore.collection<Product>('products').valueChanges();
    this.products.subscribe(date => console.log(date));
  }

  ngOnInit(): void {
  }

}
