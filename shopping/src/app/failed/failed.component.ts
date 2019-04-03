import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.css']
})
export class FailedComponent implements OnInit {

  user: any[]=[];
  name: any;
  userid: any;
  constructor(private _userService: UserService) { }

  ngOnInit() {
    let id = localStorage.getItem('id')
    this._userService.user(id).subscribe(result=>{
      this.user.push(result);
      for(let i=0;i<this.user.length;i++){
        this.name = this.user[i].name
        this.userid = this.user[i]._id
      } 
    })
  }

}
