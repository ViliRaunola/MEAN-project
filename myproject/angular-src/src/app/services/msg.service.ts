import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class MsgService {
  authToken: any;

  constructor(private http:Http) { }

  getPublicMessages(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/messages/public', {headers: headers})
      .map(res=>res.json());
  }

  sendMessage(packet){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/messages/add', packet, {headers: headers})  // FOR PRODUCTION REMOVE THE ADDRESS "http://localhost:8080/"
      .map(res => res.json());
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getPrivateMessages(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/messages/inbox', {headers: headers})
      .map(res=>res.json());
  }

  sendMessagePublic(packet){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/messages/addPublic', packet, {headers: headers})  // FOR PRODUCTION REMOVE THE ADDRESS "http://localhost:8080/"
      .map(res => res.json());
  }
  

}
