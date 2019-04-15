import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url = "http://192.168.0.138:8080"
  URL1 = "http://3.18.139.243:8808/codezeros/uploadFile/common" 

  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getUsers(){
    return this._http.post(`${this.url}/getUsers`,{},this.httpOptions)
    .pipe(
      catchError(this.errorHandler),
      map(this.extractData)
    )
  }

  getProducts(){
    return this._http.post(`${this.url}/getProducts`,{},this.httpOptions)
    .pipe(
      catchError(this.errorHandler),
      map(this.extractData)
    )
  }

  getOrders(){
    return this._http.post(`${this.url}/getOrders`,{},this.httpOptions)
    .pipe(
      catchError(this.errorHandler),
      map(this.extractData)
    )
  }

  updateStatus(data,id){
    
    const obj = {
      status : data
    }
    
    return this._http.post(`${this.url}/updateStatus/${id}`,obj)
    .pipe(
      catchError(this.errorHandler),
      map(this.extractData)
    )
  }

  upload(images: any){
    var formData = new FormData()
    formData.append('file',images)
    return this._http.post<any>(this.URL1,formData)
  }

  addProduct(productData){
    return this._http.post<any>(`${this.url}/addProduct`,productData)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  editProduct(id){
    return this._http.get(`${this.url}/editProduct/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  updateProduct(productname,price,image,category,feature,features,id){
    const obj = {
      productname: productname,
      price:price,
      image:image,
      category:category,
      feature:feature,
      features:features
    }
    return this._http.post<any>(`${this.url}/updateProduct/${id}`,obj)
    .pipe(catchError(this.errorHandler))
  }

  deleteProduct(id){
    return this._http.get(`${this.url}/deleteProduct/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  deleteUser(id){
    return this._http.get(`${this.url}/deleteUser/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  deleteOrder(id){
    return this._http.get(`${this.url}/deleteOrder/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }
}
