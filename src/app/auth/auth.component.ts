import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  private closeSubscription: Subscription;
  isLogIn = true;
  error: string = null;
  constructor(private authService: AuthService,
              private router: Router){}

  ngOnInit() {
    
  }
  onSwitch(){
    this.isLogIn = !this.isLogIn;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>


    if (this.isLogIn) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.router.navigate(['/tasks-list']);
      }, errorMessage => {
        this.error = errorMessage;
        console.log(errorMessage);
      }
    )
    form.reset();
  }
  onHandleError() {
    this.error = null;
  }
  
  ngOnDestroy(){
    if(this.closeSubscription){
      this.closeSubscription.unsubscribe();
    }
  }
}
