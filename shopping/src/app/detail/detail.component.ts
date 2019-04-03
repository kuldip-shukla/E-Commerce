import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  detail:any[]=[];
  price: any;
  productname: any;
  user: any[]=[];
  name: any;
  email: any;
  phone: any;
  userid: any;
  productid: any;

  constructor(private _userService: UserService,private http: HttpClient, private router:Router,private route: ActivatedRoute,private _location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._userService.viewData(params['id']).subscribe(res => {
        this.detail.push(res);
        for(let i=0;i<this.detail.length;i++){
          localStorage.setItem("product_id",this.detail[i]._id) 
          this.price = this.detail[i].price
          this.productname = this.detail[i].productname
        }
      });
    });
  }

  back(){
    this._location.back();
  }

  addToCart(){
    this.userid = localStorage.getItem("id")
    this.productid = localStorage.getItem("product_id")
    this._userService.cart(this.userid,this.productid)
      .subscribe((result)=>{
        console.log(result)
        // this.router.navigate(['login'])
      },(err)=>{
        console.log(err)
        // this.router.navigate(['registration'])
      }) 
  }
}
