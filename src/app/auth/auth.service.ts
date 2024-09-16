import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  signup(data: any) {
    
    const localUsers = localStorage.getItem('accounts');

    if(localUsers != null) {
      const users =  JSON.parse(localUsers);
      users.push(data);
      localStorage.setItem('accounts', JSON.stringify(users))
    } else {
      const users = [];
      users.push(data);
      localStorage.setItem('accounts', JSON.stringify(users))
    }
    alert('Registration Successful!')

  }

  login(data: any){

    const localUsers =  localStorage.getItem('accounts');

    if(localUsers != null) {
      const users =  JSON.parse(localUsers);

      const isUserPresent =  users.find( (user: any)=> user.email == data.email && user.password == data.password);

      if(isUserPresent != undefined) {
        localStorage.setItem('authUser', JSON.stringify(isUserPresent));
      }
    }

  }

  logout(){

    localStorage.removeItem('authUser');

  }

  isLoggedIn(){

    return localStorage.getItem('authUser') !== null;

  }

  getAuthUserName():String{
    const authUser =  localStorage.getItem('authUser');
    let user = [];
    
    if(authUser != null) {
      user =  JSON.parse(authUser);
    }
    return user.name;
  }
}
