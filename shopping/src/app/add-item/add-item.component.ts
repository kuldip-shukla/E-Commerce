import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

const URL = "http://66.70.179.133:8808/codezeros/uploadFile/common" 

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {


  categories = ['Laptop','Mobile'];
  categoryHasError = true;
  productForm: FormGroup;
  url: any;
  images:any[]=[];
  constructor(private toastr: ToastrService,private fb : FormBuilder, private _userService: UserService, private router: Router, private _http: HttpClient) { }

  get productname(){
    return this.productForm.get('productname');
  }
  get price(){
    return this.productForm.get('price');
  }
  get image(){
    return this.productForm.get('image');
  }
  get category(){
    return this.productForm.get('category');
  }

  get feature(){
    return this.productForm.get('feature');
  }

  get features(){
    return this.productForm.get('features') as FormArray;
  }

  addFeatures(){
    this.features.push(this.fb.control(''));
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      productname : ['',Validators.required],
      price : ['',Validators.required],
      image : ['',Validators.required],
      category : ['',Validators.required],
      feature : ['',Validators.required],
      features : this.fb.array([]),
    });
  }

   onSelectFile(event) {
    this._userService.upload(event.target.files[0])
    .subscribe((result)=>{
      this.images = result.url 
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result;
      }
    },(err)=>{
      console.log(err)
    }) 
  }

  validateCategory(value){
    if(value === 'default'){
      this.categoryHasError = true;
    }else{
      this.categoryHasError = false;
    }
  }

  onSubmit(){
    let data={
      "image":this.images,
      "productname" :this.productForm.controls.productname.value,
      "price" :this.productForm.controls.price.value,
      "category" :this.productForm.controls.category.value,
      "feature" :this.productForm.controls.feature.value,
      "features" :this.productForm.controls.features.value
    }
    this._userService.product(data)
      .subscribe((result)=>{
        this.toastr.success("Product Added Successfully","SUCCESS!")
        this.router.navigate(['home'])  
      },(err)=>{
        this.toastr.error("Can't Add Product","Oops!")
        this.router.navigate(['addProduct'])
      }) 
  }

}
