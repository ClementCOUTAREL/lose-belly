import { User } from 'src/app/shared/models/user.model';
import { createReducer, on } from '@ngrx/store';
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logout,
  signupStart,
} from './auth.actions';

export interface AppState {
  auth: State;
}

interface State {
  user: User;
  error: string;
  loading: boolean;
}

const initialState: State = {
  user: { email: '', id: '', _token: '', _tokenExpirationDate: new Date() },
  error: '',
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(signupStart, (state) => state),
  on(loginStart, (state) => {
    return {
      ...state,
      error: '',
      loading: true,
    };
  }),
  on(loginSuccess, (state, { payload }) => ({
    ...state,
    user: {
      email: payload.email,
      id: payload.id,
      _token: payload._token,
      _tokenExpirationDate: payload._tokenExpirationDate,
    },
    loading: false,
    error: '',
  })),
  on(loginFailed, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(logout, (state) => ({
    ...state,
    user: { email: '', id: '', _token: '', _tokenExpirationDate: new Date() },
  }))
);
