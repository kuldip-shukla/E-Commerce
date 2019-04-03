import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  product:any;
  productData:any[]=[];
  config: any; 
  collection = [];
  id: string;
  
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
    this.id = localStorage.getItem('token');
    this._userService.displayData()
    .subscribe(res => 
    {
      this.product = res;
      for(let i=0;i<this.product.length;i++){
        this.productData.push(this.product[i])
      } 
    })
  }
}
