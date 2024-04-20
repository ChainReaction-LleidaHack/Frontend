import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://chainapi.lleidahack.dev';

  constructor(private http: HttpClient) { }

  createParty(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/party/create`, data);
  }

  startParty(code: string, user_id:any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/party/${code}/start/${user_id}`, data);
  }

  joinParty(code: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/party/${code}/join`, data);
  }

  die(code: string, user_id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/party/${code}/${user_id}/die`, data);
  }

  refreshParty(user_id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/party/${user_id}/refresh`
    );
  }
}