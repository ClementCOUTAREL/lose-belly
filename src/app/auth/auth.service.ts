import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<any>(null);
}
