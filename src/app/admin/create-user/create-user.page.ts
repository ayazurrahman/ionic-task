import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  user:any={};
  isCreate:boolean = true;
  constructor(private userService:UserService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    // this.route.paramMap.subscribe((paramMap)=>{
    //   if(paramMap){
    //     this.isCreate = false;
    //     console.log(paramMap)
    //     let paramData = paramMap['params']
    //     console.log(paramData)
    //     this.user = {
    //       'first_name':paramData['first_name'],
    //       'last_name':paramData['last_name'],
    //       'age':paramData['age'],
    //       'designation':paramData['designation'],
    //       'email':paramData['email'],
    //       'password':paramData['password'],
    //     }
    //      console.log(this.user)
    //   }
    // })
  }
  submitUser(){
    this.user.type = "user"
    this.user.active = true;
    console.log(this.user)
    this.userService.saveUser(this.user).subscribe((res)=>{
      console.log(res)
    });
    this.router.navigateByUrl('/admin')
  }

}
