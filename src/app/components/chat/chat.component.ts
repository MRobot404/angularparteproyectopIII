import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HostListener } from '@angular/core';

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
    tiempo:'',
  };
  userData = {
    id: '',
  };
  myUsers: any;
  myUsersleft:any;
  myMessages: any;
  messagecont = 0;
  usercont = 0;
  eventName = 'send-message';
  @HostListener('window:beforeunload')
  onUnload() {
  }
  constructor(
    private activated: ActivatedRoute,
    private webService: WebSocketService
  ) {}

  ngOnInit(): void {
    const id = this.activated.snapshot.params['id'];
    const contador = this.messagecont.toString();
    this.userChat.user = id;
    this.userData.id = id;
    console.log(this.webService.socket.id);
    this.userChat.mensaje = contador;
    this.webService.emit('conectado', this.userData);
    this.webService.listen('usuariosc').subscribe((data) => {
      this.myUsers = data;
      console.log(this.myUsers);
    });
    this.webService.listen('text-event').subscribe((data) => {
      this.myMessages = data;
      console.log(this.myMessages);
    });
    this.webService.listen('usuariosd').subscribe((data) => {
      this.myUsersleft = data;
      console.log(this.myUsersleft);
    });
  }

  myMessage(): void {
    this.messagecont++;
    const mensaje = this.messagecont.toString();
    this.userChat.mensaje = mensaje;
    this.userChat.tiempo = Date.now().toString();
    this.webService.emit(this.eventName, this.userChat);
    this.userChat.text = '';
  }
  salir(): void {
    const id = this.activated.snapshot.params['id'];
    console.log("Si jala")
    this.userData.id = id;
    this.webService.emit("desconectado",this.userData);
    location.href="";
  }
}
