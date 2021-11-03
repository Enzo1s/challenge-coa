import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getToken, logout } from 'src/app/store/actions';
import { IState } from 'src/app/store/reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{


  constructor(private store: Store<IState>) {
  }
  
  ngOnInit(): void {
  }

  logout(){
    this.store.dispatch(logout());
    this.store.select('authReducer').subscribe((res) => console.log(res)).unsubscribe()
  }
  /* viewProduct() {
    this.store.dispatch(getToken());
    this.store.select('authReducer').subscribe((res) => {
      if (typeof res.auth === 'string') {
        console.log(res.auth)
      }
    })
  } */
  
}
