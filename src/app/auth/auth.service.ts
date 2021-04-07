import { Injectable } from '@angular/core';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService) { }
  isLoggedIn = false;
  isAdminLogged = false;
  admin:any = [];


  login(fromData, userData){
    for(let i=0; i<userData.length; i++){
      if(userData[i].email==fromData.email && userData[i].password==fromData.password){
        return this.isLoggedIn = true;
      }
    }
    return this.isLoggedIn = false;
  }

  userLogout(){
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
    // return;
  }


}
