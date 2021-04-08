import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  user:any
  constructor(private router:Router, private route:ActivatedRoute, private userService:UserService, private authService:AuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap)=>{
      console.log(paramMap)
      if(paramMap){
        let paramData = paramMap['params']
        this.user = {
          'first_name':paramData['first_name'],
          'last_name':paramData['last_name'],
          'age':paramData['age'],
          'designation':paramData['designation'],
          'email':paramData['email'],
          'password':paramData['password'],
          'id':paramData['id'],
        }
         console.log(this.user)
      }
    })
  }

  updatetUser(){
    console.log("Send Data",this.user)
    this.user.type = "user"
    this.userService.updateUser(this.user).subscribe((res)=>{
      console.log(this.authService.isLoggedIn)
      if(res && this.authService.isLoggedIn){
        this.router.navigate(['/user-dash', this.user])
      }
      if(res && this.authService.isAdminLogged){
        this.router.navigateByUrl('/admin/users')
      }
    });
  }

}
