import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users:any;
  usersData:any[]=[];
  constructor(private _adminService: AdminService) { }

  ngOnInit() {
    this._adminService.getUsers()
    .subscribe(res => 
    {
      this.users = res;
      for(let i=0;i<this.users.length;i++){
        this.usersData.push(this.users[i])
      } 
    })
  }

  view(){
    alert("View Clicked")
  }

  edit(){
    alert("Edit Clicked")
  }

  delete(){
    alert("Delete Clicked")
  }
}
