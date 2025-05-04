import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/getData'; // .NET API URL

  constructor(private http: HttpClient) { }
  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateData(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
