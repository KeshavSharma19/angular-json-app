import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private getApiUrl = 'http://localhost:3000/getData';
  private postApiUrl = 'http://localhost:3000/addData';

  constructor(private http: HttpClient) { }
  getData(): Observable<any> {
    return this.http.get(this.getApiUrl);
  }

  updateData(data: any): Observable<any> {
    return this.http.post(this.postApiUrl, data);
  }
}
