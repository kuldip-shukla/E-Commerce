import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url = "http://192.168.0.138:8080"
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

  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }
}
