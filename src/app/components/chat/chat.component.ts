import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WebSocketService } from '../../services/web-socket.service';
import {variable} from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  userChat = {
    user: '',
    text: '',

  };
  colors = document.querySelectorAll('color-box label');

  myMessages: any;
  messagecont = 0 ;
  usercont=0;
   eventName = 'send-message';

  constructor(
    private activated: ActivatedRoute,
    private webService: WebSocketService
  ) {
      }

  ngOnInit(): void {

    const id = this.activated.snapshot.params['id'];
    this.userChat.user = id;
    this.webService.listen('text-event').subscribe((data) => {
    this.myMessages = data;


    });

   }

  myMessage(): void {
    this.webService.emit(this.eventName, this.userChat);
    this.userChat.text = '';
    this.messagecont++;

  }


}
