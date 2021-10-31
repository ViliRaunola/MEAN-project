import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsgService } from 'app/services/msg.service';
import { Subscriber } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  messages: Array<any> = [];
  text: String;

  constructor(private router:Router,
              private flashMessage:FlashMessagesService,
              private msgService:MsgService) { }

  ngOnInit() {
    this.msgService.getPublicMessages().subscribe(response =>{
      this.messages = response.messages;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onSendPublicMessage() {

    const user = JSON.parse(localStorage.getItem("user"));

    const packet = {
      text: this.text,
      senderId: user.id,
      senderUsername: user.username
    };


    this.msgService.sendMessagePublic(packet).subscribe(data => {
      if(data.success){
        this.text = '';
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
        this.ngOnInit();
      }else{
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

}
