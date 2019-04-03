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
  // productname:any= "nokia";
  // price:any = 7000;
  constructor(private _userService: UserService,private route: ActivatedRoute,private _location: Location) { }

  ngOnInit() {
    this.userid = localStorage.getItem("id")
      this._userService.getCart(this.userid).subscribe((res:any) => {
        
        // this.detail.push(res);
        // console.log(res)
        // for(let i=0;i<this.detail.length;i++){
          res.map((data)=>{
            console.log(data.product_id)
            this.detail.push(data.product_id)
          })        
      });
    }
}