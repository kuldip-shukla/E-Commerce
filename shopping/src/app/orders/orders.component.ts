import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  detail:any[]=[];
  userid:any;
  productid:any[]=[];
  total:Number = 0;
  order:any[]=[];
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.order=[];
    this.userid = localStorage.getItem("id")
    this._userService.getOrder(this.userid).subscribe((res:any) => {
      res.map((data)=>{
        this.order.push(data)
      })    
    });
  }

  cancelOrder(id){ 
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
        this._userService.cancelOrder(id).subscribe((result)=>{
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
