import { Component, OnInit  } from '@angular/core';
import { UserService } from '../user.service';
import axios from "axios/index";
import {Location} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit  {

  detail:any[]=[];
  product_id :any;
  productname: any;
  price: any;
  user: any[]=[];
  name: any;
  email: any;
  phone: any;
  userid: any;
  
  constructor(private _userService: UserService, private router:Router,private route: ActivatedRoute,private _location: Location) { }

  ngOnInit() {
    this.product_id = localStorage.getItem("product_id")
    this._userService.viewData(this.product_id).subscribe(res => {
      this.detail.push(res);
      for(let i=0;i<this.detail.length;i++){
        this.price = this.detail[i].price
        this.productname = this.detail[i].productname
      } 
    });
    let id = localStorage.getItem('id')
    this._userService.user(id).subscribe(result=>{
      this.user.push(result);
      for(let i=0;i<this.user.length;i++){
        this.name = this.user[i].name
        this.email = this.user[i].email
        this.phone = this.user[i].phone
        this.userid = this.user[i]._id
      } 
    })
  }

  back(){
    this._location.back();
  }

 
  paypal(){
    let flag = localStorage.getItem('isLoggedIn')
    if(flag == 'true'){
      localStorage.setItem("method","paypal")
      const data = {
        intent: 'sale',
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            "return_url": "http://192.168.0.138:4200/success",
            "cancel_url": "http://192.168.0.138:4200/failed"
        },
        transactions: [{
            item_list: {
                items: [{
                    name: this.productname,
                    sku: "001",
                    price: this.price,
                    currency: "INR",
                    quantity: 1
                }]
            },
            amount: {
                currency: "INR",
                total: this.price
            },
            description: "This is the payment description."
        }]
      }
  
      axios.post('http://192.168.0.138:8080/api/bid/paypal/',data)
        .then(res =>{
          window.location.href = res.data
        })
        .catch((error)=> console.log(error.response))
    }
    else{
      this.router.navigate(['login']);
    }
  }

  instamojo(){
    let flag = localStorage.getItem('isLoggedIn')
    if(flag == 'true'){
      localStorage.setItem("method","instamojo")
      const data = {
        purpose: this.productname,
        amount: this.price,
        buyer_name: this.name,
        email: this.email,
        phone: this.phone,
        user_id: this.userid,
        redirect_url:'http://192.168.0.138:8080/api/bid/callback',
        webhook_url:'http://192.168.0.138:8080/api/bid/webhook/',
      }
  
      axios.post('http://192.168.0.138:8080/api/bid/instamojo/',data)
        .then(res =>{
          window.location.href = res.data
        })
        .catch((error)=> console.log(error.response.data))
    }
    else{
      this.router.navigate(['login']);
    }
  }
}