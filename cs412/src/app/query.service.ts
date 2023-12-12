import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient) { }

  fetchData(searchTerm: string) {
    const apiUrl = 'http://localhost:3000/ps4';
    return this.http.get(apiUrl, { params: { searchTerm } });
  }
}
