import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3200/api/register";
  private _logInUrl = "http://localhost:3200/api/login";

  constructor(private http:HttpClient,private route:Router) { }

  registerUser(user){
    return this.http.post<any>(this._registerUrl,user)
  }

  logInUser(data){
    return this.http.post<any>(this._logInUrl,data)
  }

   //auth guard
   loggedIn(){
    return !!localStorage.getItem('token')
  }

  roleAdmin(){
    
    let role = JSON.parse(localStorage.getItem('firstname'));
   
    if(role == 'Admin'){
      return !!role
   }

  }


  //get token from interceptor
  getToken(){
    return localStorage.getItem('token')
  }

  //logout
  logoutUser(){
    localStorage.removeItem('payload')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    localStorage.removeItem('Address')
    localStorage.removeItem('Address1')
    localStorage.removeItem('googleLat')
    localStorage.removeItem('googleLong')
    this.route.navigate(['/deals'])
  }
}