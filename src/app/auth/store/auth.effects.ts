import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, catchError, of, tap } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';
import { AuthResponseData } from '../interfaces/AuthResponseData.interface';
import { environment } from 'environments/environment';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  handleError = (error: any) => {
    console.log(error);

    let errorMessage = 'An error occured during authentication';
    if (!error.error || !error.error.error) {
      return of(AuthActions.loginFailed({ error: errorMessage }));
    }
    switch (error.error.error.message) {
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password provided';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'No user found with the email provided';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'User already registered';
        break;
      default:
        errorMessage = 'An error occured during authentication';
    }
    return of(
      AuthActions.loginFailed({
        error: errorMessage,
      })
    );
  };

  handleSuccess = (data: AuthResponseData) => {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const loadedUser = new User(
      data.email,
      data.localId,
      data.idToken,
      expirationDate
    );
    localStorage.setItem('userData', JSON.stringify(loadedUser));
    return AuthActions.loginSuccess({
      payload: {
        email: data.email,
        id: data.idToken,
        _token: data.idToken,
        _tokenExpirationDate: expirationDate,
      },
    });
  };

  loginStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap(
        (loginAction: { payload: { email: string; password: string } }) => {
          return this.http
            .post<AuthResponseData>(
              'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
                environment.firebaseAPIKey,
              {
                email: loginAction.payload.email,
                password: loginAction.payload.password,
                returnSecureToken: true,
              }
            )
            .pipe(
              map((response) => {
                return this.handleSuccess(response);
              }),
              catchError((error) => {
                return this.handleError(error);
              })
            );
        }
      )
    )
  );

  autologin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AUTOLOGIN),
      switchMap(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: number;
        } = JSON.parse(localStorage.getItem('userData') || ' {}');
        const expirationDate = new Date(
          new Date().getTime() - userData._tokenExpirationDate * 1000
        );
        return of(
          AuthActions.loginSuccess({
            payload: {
              email: userData.email,
              id: userData.id,
              _token: userData._token,
              _tokenExpirationDate: expirationDate,
            },
          })
        );
      })
    );
  });

  signupStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap(
        (loginAction: { payload: { email: string; password: string } }) => {
          return this.http
            .post<AuthResponseData>(
              'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
                environment.firebaseAPIKey,
              {
                email: loginAction.payload.email,
                password: loginAction.payload.password,
                returnSecureToken: true,
              }
            )
            .pipe(
              map((response) => {
                return this.handleSuccess(response);
              }),
              catchError((error) => {
                return this.handleError(error);
              })
            );
        }
      )
    );
  });

  authRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGIN_SUCCESS),
        tap(() => {
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
