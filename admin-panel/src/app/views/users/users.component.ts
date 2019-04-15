import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import Swal from 'sweetalert2'

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
    this.usersData =[]
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

  delete(id){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this._adminService.deleteUser(id).subscribe((result)=>{
          this.ngOnInit()
        },(err)=>{
          console.log(err)
        }) 
      }else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
}
