import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { User } from 'src/app/models/IUser';
import {  createCartByUserId, register } from 'src/app/store/actions';
import { IState } from 'src/app/store/reducers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({});
  model = { email: 'example@email.com', password: '', repeatPassword: '' };
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
    },
    {
      key: 'repeatPassword',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Repeat Password',
        placeholder: 'Repeat Password',
        required: true
      }
    }
  ]
  @Output() response: EventEmitter<boolean>;

  constructor(
    private state: Store<IState>,
    private router: Router
  ) {
    this.response = new EventEmitter();
  }

  ngOnInit(): void {
  }

  onSubmit(model: any) {
    if (model.password == model.repeatPassword) {
      const user: User = { uid: '', email: model.email, password: model.password }
      this.state.dispatch(register({ user }));
      this.state.select('authReducer').subscribe((res) => {
        
        if (res.auth != null) {
          console.log(res)
          this.newCart(res.auth);
          this.response.emit(true);
        }
      })

    } else {
      console.log("password incorrecta")
    }
  }

  newCart(userId: string) {
        this.state.dispatch(createCartByUserId({userId: userId}));
        this.state.select('userCartReducer').subscribe((res) => {
          console.log(res)
        })
        this.router.navigate(["/products-list"])
  }

  returnRes() {
    this.response.emit(false)
  }

}
