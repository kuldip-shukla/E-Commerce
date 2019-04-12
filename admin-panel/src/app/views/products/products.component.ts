import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products:any;
  productsData:any[]=[];
  constructor(private _adminService: AdminService) { }

  ngOnInit() {
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

  edit(){
    alert("Edit Clicked")
  }

  delete(){
    alert("Delete Clicked")
  }
}
