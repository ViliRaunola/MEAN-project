import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class MsgService {

  constructor(private http:Http) { }

  getPublicMessages(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/messages/public', {headers: headers})
      .map(res=>res.json());
  }

}
