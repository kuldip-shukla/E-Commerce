import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user:any[]=[];
  role:any;
  id:any;
  loadAPI: Promise<any>;
  constructor(private toastr: ToastrService,private fb : FormBuilder, private _userService: UserService, private router: Router){
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

  ngOnInit(){
    this.loginForm = this.fb.group({
      email : [''],
      password : ['']
    })
  } 

  public loadScript() {        
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
          isFound = true;
      }
    }

    if (!isFound) {
      var dynamicScripts = [
        "https://code.getmdl.io/1.3.0/material.min.js"
      ];

      for (var i = 0; i < dynamicScripts .length; i++) {
          let node = document.createElement('script');
          node.src = dynamicScripts [i];
          node.type = 'text/javascript';
          node.async = false;
          node.charset = 'utf-8';
          document.getElementsByTagName('head')[0].appendChild(node);
      }

    }
  }

  get f() { return this.loginForm.controls; }
  
  onSubmit(){
    this._userService.login(this.loginForm.value).subscribe((result)=>{
      this.user.push(result);
      localStorage.setItem('isLoggedIn', "true");
      localStorage.setItem('token', this.f.email.value);
      for(let i=0;i<this.user.length;i++){
        this.role = this.user[i].role
        this.id = this.user[i]._id
        localStorage.setItem('role', this.role);
        localStorage.setItem('id', this.id);
      }
      this.toastr.success("Login Successfully","SUCCESS!")
      this.router.navigate(['home']);
    },(err)=>{
      this.toastr.error("Invalid Username or Password","Oops!")
      this.router.navigate(['login']);
    })      
  };
}
