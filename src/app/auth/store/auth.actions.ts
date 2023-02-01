import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export const AUTOLOGIN = '[Auth] AutoLogin';
export const LOGIN_START = '[Auth] Login_Start';
export const LOGIN_SUCCESS = '[Auth] Login_Successt';
export const LOGIN_FAILED = '[Auth] Login_Failed';
export const SIGNUP_START = '[Auth] Signup_Start';
export const LOGOUT = '[Auth] Logout';

export const autoLogin = createAction(AUTOLOGIN);
export const loginStart = createAction(
  LOGIN_START,
  props<{ payload: { email: string; password: string } }>()
);
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ payload: User }>()
);
export const loginFailed = createAction(
  LOGIN_FAILED,
  props<{ error: string }>()
);
export const signupStart = createAction(
  SIGNUP_START,
  props<{ payload: { email: string; password: string } }>()
);
export const logout = createAction(LOGOUT);
