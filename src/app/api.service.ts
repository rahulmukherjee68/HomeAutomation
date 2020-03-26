import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, finalize, mergeAll } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  add(appName,appRoom,watt): Observable<any> 
  {
    let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		headers.append('Access-Control-Allow-Origin', '*');
		return this.http.post(`${this.url}add`, { headers: headers,appName:appName,appRoom:appRoom,watt:watt });
  }
  get(active): Observable<any> 
  {
    if(active==1)
    {
      let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		headers.append('Access-Control-Allow-Origin', '*');
		return this.http.get(`${this.url}get/1`, { headers: headers});
    }
    else if(active==0){
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      return this.http.get(`${this.url}get/0`, { headers: headers});
    }
    else{
    let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get(`${this.url}get`, { headers: headers});
    }
  }
  operate(id,status): Observable<any> 
  {
    let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		headers.append('Access-Control-Allow-Origin', '*');
		return this.http.post(`${this.url}operate`, { _id: id,status: status});
  }
  delete(id): Observable<any> 
  {
    let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		headers.append('Access-Control-Allow-Origin', '*');
		return this.http.post(`${this.url}delete`, { headers: headers,id: id});
  }
  edit(myobj): Observable<any> 
  {
    let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		headers.append('Access-Control-Allow-Origin', '*');
		return this.http.post(`${this.url}operate`, myobj);
  }

  search(skey,param): Observable<any> 
  {
    console.log(skey);
    console.log(param);
    if(param==='device')
    {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      return this.http.post(`${this.url}search/${param}`,{device:skey});
    }
    else{
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      return this.http.post(`${this.url}search/${param}`,{room:skey});
    }
    
    

  }
}
