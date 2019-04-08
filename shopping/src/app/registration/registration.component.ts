import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  roles = ['Seller','User'];
  roleHasError = true;
  registrationForm: FormGroup;
  constructor(private fb : FormBuilder, private _userService: UserService, private router: Router) { }

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

  validateRole(value){
    if(value === 'default'){
      this.roleHasError = true;
    }else{
      this.roleHasError = false;
    }
  }

  onSubmit(){
    alert("Please Verify Your Email for Login");
    if (confirm('Go to Mail Account For Verification') ) {
      window.location.href = `https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&sacu=1&rip=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin`
    }
    else {
      return false
    }
    this._userService.registration(this.registrationForm.value)
    .subscribe((result)=>{
      // this.router.navigate(['login']) 
    },(err)=>{
      this.router.navigate(['registration'])
    }) 
  }

}
