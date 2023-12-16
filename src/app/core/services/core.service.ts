import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { iLogin } from '../models/login.model';
import { IresetPassword } from '../models/resetPassword.model';
import { IVerify } from '../models/verify.model';
@Injectable({
  providedIn: 'root',
})
export class CoreService {
  role: string | null = '';
  constructor(private http: HttpClient) {
    if (localStorage.getItem('token') !== null) {
      this.getProfile();
    }
  }
  login(loginData: iLogin) {
    return this.http.post(`Users/Login`, loginData);
  }

  resetWithEmail(email: string) {
    return this.http.post(`Users/Reset/Request`, email);
  }
  resetPassword(userData: IresetPassword) {
    return this.http.post(`Users/Reset`, userData);
  }

  getProfile() {
    let encoded: any = localStorage.getItem('token');
    let decoded: any = jwtDecode(encoded);
    localStorage.setItem('role', decoded.userGroup);
    localStorage.setItem('userName', decoded.userName);
    this.getRole();
  }
  getRole() {
    if (
      localStorage.getItem('token') !== null &&
      localStorage.getItem('role')
    ) {
      this.role = localStorage.getItem('role');
    }
  }

  handleRegister(data: any): Observable<any> {
    return this.http.post('Users/Register', data);
  }
  verifyEmail(data: IVerify): Observable<any> {
    return this.http.put('Users/verify', data);
  }
}
