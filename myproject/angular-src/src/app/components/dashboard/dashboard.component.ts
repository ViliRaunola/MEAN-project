import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsgService } from 'app/services/msg.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  messages: Array<any> = [];

  constructor(private router:Router,
              private msgService:MsgService) { }

  ngOnInit() {
    this.msgService.getPublicMessages().subscribe(response =>{

      this.messages = response.messages;
      //console.log(this.messages[0].time.getTime());


      // for(let i = 0; i < messagesList.messages.length; i++){
      //   this.messages.push(messagesList.messages[i].text);
      // }

      //this.messages = messagesList.messages;
      // console.log( this.messages);
      // console.log(messagesList.messages[0].text);
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
