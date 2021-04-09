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


  constructor(private userService:UserService, private authService:AuthService, private route:Router) { }
  ngOnInit() {
    this.userService.getUsers().subscribe((res)=>{
      this.user = res;
      console.log(this.user)
    })
  }


  segmentChanged(event, formData){
    this.errorMsg = "";
    this.role = event.detail.value;
    formData.reset()
  }

  loginForm(loginUser:NgForm){
    this.errorMsg = "";
    console.log(this.role)
    if(this.role == "user"){
        this.userLogin = this.authService.login(loginUser.form.value, this.user);
        console.log(this.userLogin[0])
        if(this.userLogin[0]){
          this.route.navigate(['user-dash',this.userLogin[1]])
          loginUser.reset();
        }else{
          this.errorMsg = "Email or Password is not correct";
        }
    }
    if(this.role == "admin"){
      this.adminLogin = this.authService.adminLogin(loginUser.form.value);
      console.log("Admin",this.adminLogin)
      if(this.adminLogin){
        this.route.navigateByUrl('/admin')
        loginUser.reset();
      }else{
        this.errorMsg = "Email or Password is not correct";
      }
    }
  }


}
