import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl: string = 'http://localhost:3000/api/weather';
  private httpOptions: any;

  constructor(private http: HttpClient) {
    this.httpOptions = { withCredentials: true };
  }

  getweather(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data, this.httpOptions);
  }
}
