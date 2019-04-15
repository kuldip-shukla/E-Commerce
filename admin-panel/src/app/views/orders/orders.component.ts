import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders:any;
  ordersData:any[]=[];
  constructor(private _adminService: AdminService) { }

  ngOnInit() {
    this.ordersData = []
    this._adminService.getOrders()
    .subscribe(res => 
    {
      this.orders = res;
      for(let i=0;i<this.orders.length;i++){
        this.ordersData.push(this.orders[i])
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
        this._adminService.deleteOrder(id).subscribe((result)=>{
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
