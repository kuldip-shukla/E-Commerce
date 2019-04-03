import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-category2',
  templateUrl: './category2.component.html',
  styleUrls: ['./category2.component.css']
})
export class Category2Component implements OnInit {

  product:any;
  productData:any[]=[];
  config: any; 
  collection = [];
  category:String
  
  constructor(private _userService: UserService,private http: HttpClient, private router:Router,private route: ActivatedRoute) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 6
    };
  
    this.route.queryParamMap
    .pipe(map(params => params.get('page')))
            .subscribe(page => this.config.currentPage = page); 
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`product ${i}`);
    }
  }

  pageChange(newPage: number) {
    this.router.navigate([],{ relativeTo: this.route, queryParams: { page: newPage },queryParamsHandling: "merge"})
  }

  ngOnInit() {
    this._userService.displayData()
    .subscribe(res => 
    {
      this.product = res;
      for(let i=0;i<this.product.length;i++){
        if(this.product[i].category == "Mobile"){
          this.productData.push(this.product[i])
        }
      }
    })
  }

}
