import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signup(user) {
    return this.httpClient.post(environment.signup, user);
  }

  login(user) {
    return this.httpClient.post(environment.login, user);
  }
}
