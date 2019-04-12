import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

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

  delete(){
    alert("Delete Clicked")
  }
}
