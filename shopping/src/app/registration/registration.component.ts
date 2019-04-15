import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  roles = ['Seller','User'];
  roleHasError = true;
  registrationForm: FormGroup;
  loadAPI: Promise<any>;
  constructor(private toastr: ToastrService,private fb : FormBuilder, private _userService: UserService, private router: Router) {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }

  get name(){
    return this.registrationForm.get('name');
  }
  get email(){
    return this.registrationForm.get('email');
  }
  get password(){
    return this.registrationForm.get('password');
  }
  get role(){
    return this.registrationForm.get('role');
  }
  get phone(){
    return this.registrationForm.get('phone');
  }
  get address(){
    return this.registrationForm.get('address');
  }
  get street(){
    return this.registrationForm.get('address.street');
  }
  get city(){
    return this.registrationForm.get('address.city');
  }
  get state(){
    return this.registrationForm.get('address.state');
  }
  get pincode(){
    return this.registrationForm.get('address.pincode');
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name : ['',Validators.required],
      email : ['',Validators.required],
      password : ['',Validators.required],
      role : ['',Validators.required],
      phone : ['',Validators.required],
      address : this.fb.group({
        street : ['',Validators.required],
        city : ['',Validators.required],
        state : ['',Validators.required],
        pincode : ['',Validators.required]
      })
    });
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
        "https://code.getmdl.io/1.3.0/material.min.js",
        'https://www.google.com/recaptcha/api.js'
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

  validateRole(value){
    if(value === 'default'){
      this.roleHasError = true;
    }else{
      this.roleHasError = false;
    }
  }

  onSubmit(){
    if (confirm('Please Verify Your Email for Login') ) {
      window.location.href = `https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&sacu=1&rip=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin`
    }
    else {
      return false
    }
    this._userService.registration(this.registrationForm.value)
    .subscribe((result)=>{
      this.toastr.success("Registration Successfully","SUCCESS!")
    },(err)=>{
      this.toastr.error("Registration Unsuccessful","Oops!")
      this.router.navigate(['registration'])
    }) 
  }

}
