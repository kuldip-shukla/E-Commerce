import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  detail:any[]=[];
  userid:any;
  productid:any[]=[];
  total:Number = 0;
  cart:any=[];
  sorting: any[]=[];
  constructor(private _userService: UserService) { }

  ngOnInit() {
    // this.cart=[];
    this.userid = localStorage.getItem("id")
    this._userService.getCart(this.userid).subscribe((res:any) => {
      // res.map((data)=>{
      //   this.cart.push(data)
      // })  
      this.cart=res
      this.sum()
    });
    
  }
 
  sum(){
    this.total = 0
    for(let i=0;i<this.cart.length;i++){
      this.cart[i].product_id.price *= this.cart[i].qty;
      this.total += this.cart[i].product_id.price;
    }
    return this.total
  }

  buynow(){
    if(this.total != 0){
      return true;
    }
    else{
      return false;
    }
  }

  deleteCart(id){ 
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
        this._userService.deleteCart(id).subscribe((result)=>{
          this._userService.getCart(this.userid).subscribe((res:any) => {
              this.cart=res
              this.sum()
          });
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