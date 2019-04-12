import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  orders:any;
  ordersData:any[]=[];
  data:String = "";
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

  awaiting(id){
    this.data = "Awaiting Order";
    this._adminService.updateStatus(this.data,id).subscribe((result)=>{
      this.ngOnInit()
    },(err)=>{
      console.log("Error",err)
    })
  }

  processing(id){
    this.data = "Order In Processing";
    this._adminService.updateStatus(this.data,id).subscribe((result)=>{
      this.ngOnInit()
    },(err)=>{
      console.log("Error",err)
    }) 
  }

  dispatched(id){
    this.data = "Order Dispatched";
    this._adminService.updateStatus(this.data,id).subscribe((result)=>{
      this.ngOnInit()
    },(err)=>{
      console.log("Error",err)
    })
  }

  delivered(id){
    this.data = "Order Delivered";
    this._adminService.updateStatus(this.data,id).subscribe((result)=>{
      this.ngOnInit()
    },(err)=>{
      console.log("Error",err)
    })
  }

  returns(id){
    this.data = "Order Returned";
    this._adminService.updateStatus(this.data,id).subscribe((result)=>{
      this.ngOnInit()
    },(err)=>{
      console.log("Error",err)
    })
  }
}
