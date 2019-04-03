import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {

  id:any;
  updateForm: FormGroup;
  constructor(private route: ActivatedRoute,private fb : FormBuilder, private _userService: UserService, private router: Router,private _location: Location) { }

  get name(){
    return this.updateForm.get('name');
  }
  get email(){
    return this.updateForm.get('email');
  }
  get password(){
    return this.updateForm.get('password');
  }
  get role(){
    return this.updateForm.get('role');
  }
  get phone(){
    return this.updateForm.get('phone');
  }
  get address(){
    return this.updateForm.get('address');
  }
  get street(){
    return this.updateForm.get('address.street');
  }
  get city(){
    return this.updateForm.get('address.city');
  }
  get state(){
    return this.updateForm.get('address.state');
  }
  get pincode(){
    return this.updateForm.get('address.pincode');
  }

  ngOnInit() {
    this.updateForm = this.fb.group({
      name : ['',Validators.required],
      email : ['',Validators.required],
      password : [{value: '', disabled:true},Validators.required],
      phone : ['',Validators.required],
      address : this.fb.group({
        street : ['',Validators.required],
        city : ['',Validators.required],
        state : ['',Validators.required],
        pincode : ['',Validators.required]
      })
    });
  }
  data: any = {};
  ngAfterViewInit(){
    this.id = localStorage.getItem("id")
      this._userService.editData(this.id).subscribe(res => {
        this.data = res;
        this.updateForm.patchValue(this.data);
      });
  }

  onSubmit(name,email,phone,street,city,state,pincode) {
    this._userService.updateData(name,email,phone,street,city,state,pincode,this.id)
      .subscribe((result)=>{
        this._location.back();
      },(err)=>{
        console.log("Error",err)
      }) 
  }

  back(){
    this._location.back();
  }

}
