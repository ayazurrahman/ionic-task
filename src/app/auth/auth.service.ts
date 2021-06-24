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
    console.log(fromData, userData)
    let response = [];
    for(let i=0; i<userData.length; i++){
      console.log(userData[i])
      if(userData[i].email==fromData.email && userData[i].password==fromData.password && userData[i].active == 'true'){
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

  adminLogin(formData, admin){
    let response = [];
    for(let i=0; i<admin.length; i++){
        if(admin[i].email==formData.email && admin[i].password==formData.password){
          console.log(this.isAdminLogged)
          this.isAdminLogged = true;
          response.push(this.isAdminLogged, admin[i])
        this.storeUser(admin[i])
          return response;
        }
      }
      return this.isAdminLogged = false;
  }

  adminLogout(){
    Storage.remove({ key: 'authData' });
    return this.isAdminLogged = false;
  }

  storeUser(user){
    const data = JSON.stringify(user)
    Plugins.Storage.set({key:'authData', value:data})
    // this.getUser();
  }

  async getUser(){
    if(Storage.get({ key: 'authData' })){
      const storedUser = await Storage.get({ key: 'authData' })
      const user = JSON.parse(storedUser.value);
      if(user.type == 'user'){
        return this.isLoggedIn = true;
      }else{
        return this.isAdminLogged = true;
      }
      // return user;
    }
  }



}
