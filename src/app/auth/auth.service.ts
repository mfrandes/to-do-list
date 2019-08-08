import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';


export interface AuthResponseData{
  user:{
    username: string,
    _id: string,
    admin: boolean
  }
  token: string,
}

@Injectable({
  providedIn: 'root'
})
// de rezolvat token expires
export class AuthService {
  user= new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  constructor(private http:HttpClient, 
              private router: Router) { }
  
  signUp(email: string, password: string){
    return this.http.post<AuthResponseData>('http://127.0.0.1:8080/api/auth/register',
    {
      username: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentification(resData.user.username, resData.user._id, resData.user.admin, resData.token)
      })
    )
  }
  login(email: string, password: string){
    return this.http.post<AuthResponseData>('http://127.0.0.1:8080/api/auth/login',
    {
      username: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentification(resData.user.username, resData.user._id, resData.user.admin, resData.token)
      })
    )
  }

  private handleError(errorResponse: HttpErrorResponse){
    let errorMessage = "An unknown error accured!";    
    if(!errorResponse.error){
      return throwError(errorMessage);
    }
    switch(errorResponse.error.message){
      case 'User already exists':
        errorMessage= "Email allredy in use!"
        break;
      case 'Invalid credentials':
        errorMessage= 'Invalid credentials'
        break;
      case 'Invalid credentials':
        errorMessage = "Invalid credentials"
    }
    return throwError(errorMessage);
  }
  private handleAuthentification(
    unername:string,
    userId:string,
    admin: boolean,
    token: string,
    expiration: number = 43200
  ){
    const expireDate =  new Date( new Date().getTime() + expiration * 1000);
    const user = new User(
      unername, 
      userId, 
      admin, 
      token, 
      expireDate);
    this.user.next(user);
    this.autoLogout(expiration * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if( this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
  autoLogin(){
    const userData: {
      email: string,
      id: string,
      admin: boolean,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData.admin,
      userData._token,
      new Date(userData._tokenExpirationDate)
    )
    if (loadedUser.token){
      this.user.next(loadedUser)
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration);
    }
    
  }
}
