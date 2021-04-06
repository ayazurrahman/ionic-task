import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  user:any
  constructor(private router:Router, private route:ActivatedRoute, private userService:UserService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap)=>{
      if(paramMap){
        let paramData = paramMap['params']
        this.user = {
          'first_name':paramData['first_name'],
          'last_name':paramData['last_name'],
          'age':paramData['age'],
          'designation':paramData['designation'],
          'email':paramData['email'],
          'password':paramData['password'],
        }
         console.log(this.user)
      }
    })
  }

  updatetUser(){
    console.log("Send Data",this.user)
    this.userService.updateUser(this.user).subscribe((res)=>{
      console.log(res)
    });
    this.router.navigateByUrl('/admin')
  }

}
