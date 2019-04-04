import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  paymment_method:string;
  payment_id: string;
  detail:any[]=[];
  product_id :any;
  productname: string;
  price:string;
  user: any[]=[];
  userid: any;
  name: any;
  street:any;
  city:any;
  state:any;
  pincode:any;
  id:any;
  constructor(private route: ActivatedRoute, private _userService: UserService) { }

  ngOnInit() {
    this.id = localStorage.getItem('id');
    this._userService.user(this.id).subscribe(result=>{
      this.user.push(result);
      for(let i=0;i<this.user.length;i++){
        this.name = this.user[i].name
        this.userid = this.user[i]._id
        this.street = this.user[i].address.street
        this.city = this.user[i].address.city
        this.state = this.user[i].address.state
        this.pincode = this.user[i].address.pincode
      } 
    })
    this.product_id = localStorage.getItem("product_id")
    this._userService.viewData(this.product_id).subscribe(res => {
      this.detail.push(res);
      for(let i=0;i<this.detail.length;i++){
        this.price = this.detail[i].price
        this.productname = this.detail[i].productname
      } 
    });
    this.paymment_method = localStorage.getItem("method")
    if(this.paymment_method == "instamojo"){
      this.route.queryParams.forEach((params: Params) => {
        this.payment_id = params.payment_id
      })
    }else{
      this.route.queryParams.forEach((params: Params) => {
        this.payment_id = params.paymentId
      })
    }
    this.payment()
  }

  payment(){
    this._userService.paymentData(this.payment_id,this.id,this.product_id)
    .subscribe((res: any) => {
      //code res
    });
  }
}
