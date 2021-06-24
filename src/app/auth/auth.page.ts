import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from './auth.service';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  userLogin;
  adminLogin;
  role = "admin";
  user;
  errorMsg;
  admin;
  authForm:any = {};


  constructor(private userService:UserService, private authService:AuthService, private route:Router) { }
  ngOnInit() {
    this.userService.getUsers().subscribe((res)=>{
      this.user = res;
      console.log(this.user)
    })
    this.userService.getAdmin().subscribe(res=>{
      this.admin = res;
    })
    this.getUser()
  }



  async getUser(){
    const storedUser = await Storage.get({ key: 'authData' })
    if(storedUser.value){
      const user = JSON.parse(storedUser.value);
      this.user = user;
      if(this.user.type == 'user'){
        this.authService.isLoggedIn = true
        this.route.navigate(['user-dash',this.user])
      }else{
        this.authService.isAdminLogged = true;
        this.route.navigateByUrl('/admin')
      }
    }
  }


  segmentChanged(event, formData){
    this.errorMsg = "";
    this.role = event.detail.value;
    formData.reset()
  }

  loginForm(formData){
    this.errorMsg = "";
    console.log(this.authForm)
    if(this.role == "user"){
        this.userLogin = this.authService.login(this.authForm, this.user);
        console.log(this.userLogin[0])
        if(this.userLogin[0]){
          this.route.navigate(['user-dash',this.userLogin[1]])
          formData.reset()
        }else{
          this.errorMsg = "Email or Password is not correct";
        }
    }
    if(this.role == "admin"){
      this.adminLogin = this.authService.adminLogin(this.authForm, this.admin);
      console.log("Admin",this.adminLogin)
      if(this.adminLogin[0]){
        this.route.navigateByUrl('/admin')
        formData.reset()
      }else{
        this.errorMsg = "Email or Password is not correct";
      }
    }
  }


}
