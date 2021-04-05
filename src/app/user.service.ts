import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  saveUser(user){
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'abcde',
    });
    return this.http.post('http://localhost:3000/users',user, {
      headers: httpHeaders,
    });
  }
}
