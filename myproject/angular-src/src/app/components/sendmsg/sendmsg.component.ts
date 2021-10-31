import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MsgService } from 'app/services/msg.service';

@Component({
  selector: 'app-sendmsg',
  templateUrl: './sendmsg.component.html',
  styleUrls: ['./sendmsg.component.css']
})
export class SendmsgComponent implements OnInit {
  message: String;
  userName: String;

  constructor(private router: Router,
              private flashMessage:FlashMessagesService,
              private msgService:MsgService) { }

  ngOnInit() {
  }

  onSendMsgSubmit(){

    const userId = JSON.parse(localStorage.getItem("user"));

    const packet = {
      text: this.message,
      receiverUsername: this.userName,
      senderId: userId.id
    }

    this.msgService.sendMessage(packet).subscribe(data => {
      if(data.success){
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
      }else{
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

}
