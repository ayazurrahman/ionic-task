import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users:any
  constructor(private userService:UserService, private route:ActivatedRoute, public alertCtrl:AlertController) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.userService.getUsers().subscribe((res)=>{
      console.log(res)
      this.users = res
    })
  }

  async deleteUser(id){
    const confirm = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you want to delete this user?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.userService.deleteUser(id).subscribe((res) => {
              console.log(res);
            });
            this.ionViewWillEnter();
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log("Close");
          }
        }
      ]
    });
    await confirm.present();
  }

  changeStatus(user){
    console.log(user.active)
    if(user.active == true){
      user.active = false;

    }else{
      user.active = true;
    }
    this.userService.updateUser(user).subscribe(res=>{
      console.log(res)
    })
  }

}
