import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {
  APIUrl: string = environment.apiUrl;
  token: any;
  user: any;

  constructor(public http: Http) { }

  getUsers() {
    return this.http.get(`${this.APIUrl}/user`).map(res => res.json());
  }

  addUser(user) {
    return this.http.post(`${this.APIUrl}/user`, user).map(res => res.json());
  }

  authUser(user) {
    return this.http.post(`${this.APIUrl}/login`, user).map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.token = token;
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }
}
