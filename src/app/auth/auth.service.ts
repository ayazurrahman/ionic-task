import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService) { }
  isLoggedIn = false;
  isAdminLogged = false;
  admin:any = [];


  login(fromData, userData){
    let response = [];
    for(let i=0; i<userData.length; i++){
      if(userData[i].email==fromData.email && userData[i].password==fromData.password){
        this.isLoggedIn = true;
        response.push(this.isLoggedIn, userData[i])
        this.storeUser(userData[i])
        return response;
      }
    }
    return this.isLoggedIn = false;
  }

  userLogout(){
    Storage.remove({ key: 'authData' });
    return this.isLoggedIn = false;
  }

  adminLogin(formData){
    this.userService.getAdmin().subscribe(res=>{
      this.admin = res;
      console.log("Admin Push",this.admin)
    })
    for(let i=0; i<this.admin.length; i++){
      if(this.admin[i].email==formData.email && this.admin[i].password==formData.password){
        console.log(this.isAdminLogged)
        return this.isAdminLogged = true;
      }
    }
    return this.isAdminLogged = false;
  }

  adminLogout(){
    this.isAdminLogged = false;
  }

  storeUser(user){
    const data = JSON.stringify(user)
    Plugins.Storage.set({key:'authData', value:data})
  }

  getUser(){
    if(Storage.get({ key: 'authData' })){
      this.isAdminLogged = true;
    }
  }

  autoLogin(){
    return Storage.get({ key: 'authData' }) ? 'true' : false;
  }


}
