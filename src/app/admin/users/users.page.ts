import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users:any
  constructor(private userService:UserService, private route:ActivatedRoute) { }

  ngOnInit() {
      this.userService.getUsers().subscribe((res)=>{
        console.log(res)
        this.users = res
      });
  }

  deleteUser(id){
    this.userService.deleteUser(id).subscribe((res)=>{
      console.log(res)
    })
  }

}
