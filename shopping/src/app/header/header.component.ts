import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthGuard } from '../auth.guard';
import { Router } from '@angular/router';
import { tokenKey } from '@angular/core/src/view';

@Component({
  selector: '<app-header>',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  get:any;
  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit() {
  
  }

  logout(): void {
    this._userService.logout();
    this.router.navigate(['/login']);
  }
  
  role(){
    let role = localStorage.getItem('role')
    if(role == "Seller"){
      return true
    }
    else{
      return false
    }
  }

  checkAuthentication(){
    let flag = localStorage.getItem('isLoggedIn')
    if(flag == 'true'){
      return true
    }
    else{
      return false
    }
  }
}
