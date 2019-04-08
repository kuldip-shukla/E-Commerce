import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

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
    this.userid = localStorage.getItem("id")
    this._userService.getOrder(this.userid).subscribe((res:any) => {
      res.map((data)=>{
        this.order.push(data)
      })    
    });
  }

  // sum(){
  //   for(let i=0;i<this.order.length;i++){
  //     this.total += this.order[i].product_id.price
  //   }
  //   return this.total
  // }

  // deleteCart(id){ 
  //   this._userService.deleteCart(id)
  //   .subscribe((result)=>{
  //     this.ngOnInit()
  //   },(err)=>{
  //     console.log(err)
  //   }) 
  // }

}
