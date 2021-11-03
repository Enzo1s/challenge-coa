import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/IUser';
import { loadUserCartByUser, sigin } from 'src/app/store/actions';
import { IState } from 'src/app/store/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  subscribe!: Subscription;
  form = new FormGroup({});
  model = { email: 'example@email.com', password: '' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        placeholder: 'Enter Password',
        required: true
      }
    }
  ]

  @Output() response: EventEmitter<boolean>;
  constructor(
    private authState: Store<IState>,
    private router: Router
  ) {
    this.response = new EventEmitter();
  }

  ngOnInit(): void {
  }

  returnRes() {
    this.response.emit(false)
  }

  logIn(model: any) {
    const user: User = { uid: '', email: model.email, password: model.password }
    this.authState.dispatch(sigin({ user }));
    this.subscribe = this.authState.select('authReducer').subscribe((res) => {
      if (res.auth != null) {
        let id: string = res.auth;
        this.authState.dispatch(loadUserCartByUser({user_id:id}));
        this.response.emit(true)
        this.router.navigate(['/cart-list'])
        //this.subscribe.unsubscribe();
      }
    })
  }

}
