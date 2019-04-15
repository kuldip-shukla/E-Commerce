import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  categories = ['Laptop','Mobile'];
  categoryHasError = true;
  updateProductForm: FormGroup;
  url: any;
  images:any[]=[];
  loadAPI: Promise<any>;
  data: any = {};
  fileName = '';
  constructor(private toastr: ToastrService, private route: ActivatedRoute, private fb : FormBuilder, private _adminService: AdminService, private router: Router) {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }

  get productname(){
    return this.updateProductForm.get('productname');
  }
  get price(){
    return this.updateProductForm.get('price');
  }
  get image(){
    return this.updateProductForm.get('image');
  }
  get category(){
    return this.updateProductForm.get('category');
  }

  get feature(){
    return this.updateProductForm.get('feature');
  }

  get features(){
    return this.updateProductForm.get('features') as FormArray;
  }

  addFeatures(){
    this.features.push(this.fb.control(''));
  }

  ngOnInit() {
    this.updateProductForm = this.fb.group({
      productname : ['',Validators.required],
      price : ['',Validators.required],
      image : [this.fileName,Validators.required],
      category : ['',Validators.required],
      feature : ['',Validators.required],
      features : this.fb.array([]),
    });
  }

  ngAfterViewInit(){
    this.route.params.subscribe(params => {
      this._adminService.editProduct(params['id']).subscribe(res => {
        this.data = res;
        console.log("data",this.data.image)
        this.fileName = this.data.image
        this.updateProductForm.patchValue(this.data);
      });
    });
  }

  onSelectFile($event) {
    let file = $event.target.files[0]; // <--- File Object for future use.
     this.updateProductForm.controls['image'].patchValue(file ? file.name : '');
    this._adminService.upload($event.target.files[0]).subscribe((result)=>{
      this.images = result.url 
      var reader = new FileReader();
      reader.readAsDataURL($event.target.files[0]);
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result;
      }
    },(err)=>{
      console.log(err)
    }) 
  }

  public loadScript() {        
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
          isFound = true;
      }
    }

    if (!isFound) {
      var dynamicScripts = [
        "https://code.getmdl.io/1.3.0/material.min.js"
      ];

      for (var i = 0; i < dynamicScripts .length; i++) {
          let node = document.createElement('script');
          node.src = dynamicScripts [i];
          node.type = 'text/javascript';
          node.async = false;
          node.charset = 'utf-8';
          document.getElementsByTagName('head')[0].appendChild(node);
      }

    }
  }

  validateCategory(value){
    if(value === 'default'){
      this.categoryHasError = true;
    }else{
      this.categoryHasError = false;
    }
  }

  onSubmit(productname,price,image,category,feature,features){
    this.route.params.subscribe(params => {
      this._adminService.updateProduct(productname,price,image,category,feature,features,params['id']).subscribe((result)=>{
        this.toastr.success("Product Updates Successfully","SUCCESS!")
        this.router.navigate(['dashboard'])  
      },(err)=>{
        this.toastr.error("Can't Update Product","Oops!")
      })
    })
  }
    
}
