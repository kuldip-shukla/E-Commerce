import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// declare var product:Array<any>

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  detail:any[]=[];
  cart:any[];
  userid:any;
  productid:any[]=[];
  total:Number = 0;
  cart_id:any;
  constructor(private _userService: UserService,private _location: Location) { }

  ngOnInit() {
    this.userid = localStorage.getItem("id")
      this._userService.getCart(this.userid).subscribe((res:any) => {
        res.map((data)=>{
          this.cart_id = data._id
          this.detail.push(data.product_id)
        })    
      });
  }

  sum(){
    for(let i=0;i<this.detail.length;i++){
      this.total += this.detail[i].price
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