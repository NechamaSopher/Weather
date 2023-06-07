import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'http://localhost:3000/api';
  private httpOptions: any;

  userChange: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient) {
    this.httpOptions = { withCredentials: true };
    this.setUser();
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data, this.httpOptions);
  }

  registration(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/registration`, data, this.httpOptions);
  }

  setUser(): void {
    this.http.get(`${this.baseUrl}/user`, this.httpOptions)
      .subscribe((res: any) => res.data && this.userChange.next(res.data));
  }

  clearUser(): void {
    this.userChange.next({});
  }
}
