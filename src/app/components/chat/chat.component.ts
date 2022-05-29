import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WebSocketService } from '../../services/web-socket.service';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Socket } from 'socket.io-client';
import { Observable, retry } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  userChat = {
    user: '',
    text: '',
    mensaje: '',
  };
  userData = {
    id: '',
    nombre:'',
  };
  myUsers: any;
  myMessages: any;
  messagecont = 0;
  usercont = 0;
  eventName = 'send-message';

  constructor(
    private activated: ActivatedRoute,
    private webService: WebSocketService
  ) {}

  ngOnInit(): void {
    const id = this.activated.snapshot.params['id'];
    const contador = this.messagecont.toString();
    this.userChat.user = id;
    this.userData.nombre = id
    console.log(this.webService.socket.id)
    this.userChat.mensaje = contador;
    this.webService.emit('conectado', this.userData);
    this.webService.listen('usuarios').subscribe((data) => {
      this.myUsers = data;
      console.log(this.myUsers);
    });
    this.webService.listen('text-event').subscribe((data) => {
      this.myMessages = data;
      console.log(this.myMessages);
    });
    
  }

  myMessage(): void {
    this.messagecont++;
    const mensaje = this.messagecont.toString();
    this.userChat.mensaje = mensaje;
    this.webService.emit(this.eventName, this.userChat);
    this.userChat.text = '';
  }
 
}
