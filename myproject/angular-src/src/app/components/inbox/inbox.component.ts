import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MsgService } from 'app/services/msg.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  messages: Array<any> = [];

  constructor(private router: Router,
              private msgService:MsgService) { }

  ngOnInit() {

    this.msgService.getPrivateMessages().subscribe(response => {
      this.messages = response.messages;
    },
    err => {
      console.log(err);
      return false;
    }
    )
  }

}
