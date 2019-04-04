import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://192.168.0.138:8080"
  URL1 = "http://66.70.179.133:8808/codezeros/uploadFile/common" 
  
  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  
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

  product(productData){
    return this._http.post<any>(`${this.url}/addProduct`,productData)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  cart(userid,productid){
    const obj = {
      user_id: userid,
      product_id:productid
    }
    console.log("obj",obj)
    return this._http.post<any>(`${this.url}/cart`,obj)
    .pipe(catchError(this.errorHandler))
  }

  getCart(id){
    return this._http.get(`${this.url}/getCart/${id}`)
    .pipe(
      catchError(this.errorHandler)
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

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  viewData(id){
    return this._http.get(`${this.url}/detail/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  user(id){
    return this._http.get(`${this.url}/user/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  paymentData(id){
    return this._http.get(`${this.url}/payment/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  displayData(){
    return this._http.post(`${this.url}/home`,{},this.httpOptions)
    .pipe(
      catchError(this.errorHandler),
      map(this.extractData)
    )
  }
  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }
}
