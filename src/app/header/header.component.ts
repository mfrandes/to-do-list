import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  userEmail;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.user.subscribe(user=>{
      this.isAuthenticated = !user ? false : true;
      if(user){
        this.userEmail = user.email;
      }
    })
    console.log(this.isAuthenticated);
    
  }
  onLogout(){
    this.authService.logout()
  }

}
