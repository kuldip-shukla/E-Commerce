import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  detail:any[]=[];
  // cart:any[];
  userid:any;
  productid:any[]=[];
  total:Number = 0;
  cart:any[]=[];
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.cart=[];
    this.total = 0
    this.userid = localStorage.getItem("id")
    this._userService.getCart(this.userid).subscribe((res:any) => {
      res.map((data)=>{
        this.cart.push(data)
      })    
    });
  }

  sum(){
    for(let i=0;i<this.cart.length;i++){
      this.total += this.cart[i].product_id.price
    }
    return this.total
  }

  deleteCart(id){ 
    this._userService.deleteCart(id)
    .subscribe((result)=>{
      this.ngOnInit()
    },(err)=>{
      console.log(err)
    }) 
  }
}