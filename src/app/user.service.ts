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
    return this.http.post('http://192.168.2.230:3000/users',user, {
      headers: httpHeaders,
    });
  }

  updateUser(user){
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json; charset=UTF-8'
    });
    console.log(user)
    return this.http.put('http://192.168.2.230:3000/users/'+user.id,user)
  }

  deleteUser(id){
    return this.http.delete('http://192.168.2.230:3000/users/'+id)
  }

  getUsers(){
    return this.http.get('http://192.168.2.230:3000/users')
  }

  getAdmin(){
    return this.http.get('http://192.168.2.230:3000/admin')
  }




}
