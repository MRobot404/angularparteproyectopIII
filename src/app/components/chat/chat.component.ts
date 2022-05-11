import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';

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

  myMessages: any;
  eventName = 'send-message';

  constructor(
   private activated: ActivatedRoute,
    private webService: WebSocketService
  ) {}

  ngOnInit(): void {
    
  }
}
