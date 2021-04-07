import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router:Router, private authService:AuthService) {}

  onLogut(){
    this.authService.adminLogout();
    this.authService.userLogout();
    this.router.navigateByUrl('/auth')
  }
}
