import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromAuth from './store/auth.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  loginMode = true;
  loading = false;
  error: string = '';

  private authSub!: Subscription;

  constructor(private store: Store<fromAuth.AppState>) {}

  ngOnInit(): void {
    this.authSub = this.store.select('auth').subscribe((state) => {
      this.loading = state.loading;
      this.error = state.error;
    });
    this.store.dispatch(AuthActions.autoLogin());
  }

  onSwitch() {
    console.log(this.loginMode);

    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    if (this.loginMode) {
      this.store.dispatch(
        AuthActions.loginStart({
          payload: { email: email, password: password },
        })
      );
    } else {
      this.store.dispatch(
        AuthActions.signupStart({
          payload: { email: email, password: password },
        })
      );
    }

    form.reset();
  }

  ngOnDestroy(): void {
    if (this.store) {
      this.authSub.unsubscribe();
    }
  }
}
