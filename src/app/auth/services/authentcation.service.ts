import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserData } from '../models/iUser.model';

@Injectable({
  providedIn: 'root',
})
export class AuthentcationService {
  constructor(private http: HttpClient) {}

  login(userData: UserData): Observable<any> {
    return this.http
      .get<any[]>(
        `http://localhost:3000/users?username=${userData.username}&password=${userData.password}`
      )
      .pipe(
        map((users) => {
          if (users.length > 0) {
            return {
              success: true,
              message: 'Login successful',
              data: users[0],
            };
          } else {
            return {
              success: false,
              message: 'Invalid username or password',
            };
          }
        })
      );
  }
}
