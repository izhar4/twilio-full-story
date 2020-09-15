import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TwillioChatService {

  constructor(private readonly http: HttpClient) { }

  getToken(): Observable<{ token: string }> {
    return this.http.get<{ token: string }>('http://localhost:3000/token');
  }
}
