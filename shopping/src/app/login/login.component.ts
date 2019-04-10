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

  constructor(private toastr: ToastrService,private fb : FormBuilder, private _userService: UserService, private router: Router,private _location: Location){}

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

  get f() { return this.loginForm.controls; }
  
  onSubmit(){
    this._userService.login(this.loginForm.value)
        .subscribe((result)=>{
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
