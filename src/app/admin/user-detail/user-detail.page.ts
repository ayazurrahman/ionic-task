import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {
  user:any;
  constructor(private route:ActivatedRoute) { }

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

}
