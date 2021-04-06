import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  saveUser(user){
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json'
    });
    return this.http.post('http://localhost:3000/users',user, {
      headers: httpHeaders,
    });
  }

  updateUser(user){
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json; charset=UTF-8'
    });
    return this.http.put('http://localhost:3000/users',{
      method:'PUT',
      body:{
        data:user
      },
      headers: httpHeaders,
    })
  }

  deleteUser(id){
    return this.http.delete('http://localhost:3000/users/'+id)
  }

  getUsers(){
    return this.http.get('http://localhost:3000/users')
  }


}
