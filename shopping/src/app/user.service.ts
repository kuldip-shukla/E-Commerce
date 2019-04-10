import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  registration(userData){
    return this._http.post<any>(`${this.url}/registration`,userData)
    .pipe(catchError(this.errorHandler))
  }
  
  login(userData){
    return this._http.post<any>(`${this.url}/login`,userData)
    .pipe(
      catchError(this.errorHandler),
      map(result=>{
        return result;
      })
    )
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
  } 

  user(id){
    return this._http.get(`${this.url}/user/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  editData(id){
    return this._http.get(`${this.url}/edit/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  updateData(name,email,phone,street,city,state,pincode,id){
    const obj = {
      name: name,
      email:email,
      phone:phone,
      street:street,
      city:city,
      state:state,
      pincode:pincode
    }
    return this._http.post<any>(`${this.url}/updateProfile/${id}`,obj)
    .pipe(catchError(this.errorHandler))
  }

  displayData(){
    return this._http.post(`${this.url}/home`,{},this.httpOptions)
    .pipe(
      catchError(this.errorHandler),
      map(this.extractData)
    )
  }

  product(productData){
    return this._http.post<any>(`${this.url}/addProduct`,productData)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  cart(userid,productid,qty){
    const obj = {
      user_id: userid,
      product_id: productid,
      qty: qty
    }
    return this._http.post<any>(`${this.url}/cart`,obj)
    .pipe(catchError(this.errorHandler))
  }

  getCart(id){
    return this._http.post(`${this.url}/getCart/${id}`,{},this.httpOptions)
    .pipe(
      catchError(this.errorHandler),
      map(this.extractData)
    )
  }

  deleteCart(id){
    return this._http.get(`${this.url}/deleteCart/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  upload(images: any){
    var formData = new FormData()
    formData.append('file',images)
    return this._http.post<any>(this.URL1,formData)
  }

  viewData(id){
    return this._http.get(`${this.url}/detail/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  } 

  paymentData(paymentid,userid,productid){
    const obj = {
      payment_id: paymentid,
      user_id: userid,
      product_id:productid
    }
    return this._http.post(`${this.url}/payment`,obj)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getOrder(id){
    return this._http.post(`${this.url}/getOrder/${id}`,{},this.httpOptions)
    .pipe(
      catchError(this.errorHandler),
      map(this.extractData)
    )
  }

  cancelOrder(id){
    return this._http.get(`${this.url}/cancelOrder/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }
}
