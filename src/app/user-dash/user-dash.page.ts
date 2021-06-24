import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from '../assignment.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.page.html',
  styleUrls: ['./user-dash.page.scss'],
})
export class UserDashPage implements OnInit {
  loggedUser;
  users;
  tasks;
  message;
  constructor(private route: ActivatedRoute, private userService:UserService, private assignmentService:AssignmentService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap)=>{
      if(paramMap){
        let paramData = paramMap['params']
        this.loggedUser = {
          'first_name':paramData['first_name'],
          'last_name':paramData['last_name'],
          'age':paramData['age'],
          'designation':paramData['designation'],
          'email':paramData['email'],
          'password':paramData['password'],
          'id':paramData['id'],
          'present':paramData['present'],
          'pdate':paramData['pdate'],
          'active':paramData['active']
        }
         console.log(this.loggedUser)

      }
    })
    this.userService.getUsers().subscribe(res=>{
      this.users = res;
      console.log(res)
    })
    this.assignmentService.getAssignment().subscribe(res=>{
      this.tasks = res;
      console.log(this.tasks)
      this.getActiveUser();
    },(err)=>{
      console.log(err)
    })
  }
  getActiveUser(){
    this.users = this.users.filter(user=>{
      return user.active == 'true'
    })
    console.log(this.users)
    this.assignTask()
  }

  assignTask(){
    let initialDate = new Date();
    let endDate = new Date();
    let numberOfDaysToAdd = this.users.length;
    endDate.setDate(endDate.getDate() + numberOfDaysToAdd);
    let dates = [];
    while( initialDate < endDate ){
      dates.push(new Date(initialDate));
      initialDate.setDate(initialDate.getDate() + 1);
    }
    let datesArray:any = [];
    for(let i =0; i<dates.length; i++){
      datesArray.push(dates[i].toLocaleDateString("en-US"))
    }
    for(let i=0; i<this.users.length; i++){
      let itemObj = {
        date:datesArray[i],
        userID:this.users[i].id
      }
      if(this.users.length > this.tasks.length){
        this.assignmentService.submitAssignment(itemObj).subscribe(res=>{
          console.log(res)
        })
      }
    }

    let todayDate = new Date().toLocaleDateString("en-US");
    console.log(this.tasks)
    for(let i=0; i<this.tasks.length; i++){
      if(this.tasks[i].userID == Number(this.loggedUser.id) && this.tasks[i].date == todayDate){
        this.message = "You have to present today"
      }
    }
    this.checkLastDate()
  }

  checkLastDate(){
    let todayDate = new Date().toLocaleDateString("en-US");
    let datesArr:any = [];
    this.tasks.forEach(task=>{
      datesArr.push(task.date)
    })
    console.log(datesArr)
    let mxDate = datesArr.reduce(function (a, b) {
      return a > b ? a : b;
    });
    if(mxDate < todayDate){
      this.tasks.forEach(task=>{
        this.assignmentService.deleteTask(task.id).subscribe(res=>{
          console.log(res)
        })
      })
    }

  }


}
