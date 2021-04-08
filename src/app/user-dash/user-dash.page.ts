import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.page.html',
  styleUrls: ['./user-dash.page.scss'],
})
export class UserDashPage implements OnInit {
  user;
  constructor(private route: ActivatedRoute) { }

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
          'id':paramData['id'],
        }
         console.log(this.user)
      }
    })
  }

}
