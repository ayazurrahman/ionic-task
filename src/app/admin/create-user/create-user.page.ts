import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  user:any={};
  constructor(private userService:UserService) { }

  ngOnInit() {
  }
  submitUser(){
    console.log(this.user)
    this.userService.saveUser(this.user).subscribe((res)=>{
      console.log(res)
    })
  }

}
