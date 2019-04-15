import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products:any;
  productsData:any[]=[];
  constructor(private _adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.productsData = []
    this._adminService.getProducts()
    .subscribe(res => 
    {
      this.products = res;
      for(let i=0;i<this.products.length;i++){
        this.productsData.push(this.products[i])
      } 
    })
  }

  view(){
    alert("View Clicked")
  }

  delete(id){
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
        this._adminService.deleteProduct(id).subscribe((result)=>{
          this.ngOnInit()
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
