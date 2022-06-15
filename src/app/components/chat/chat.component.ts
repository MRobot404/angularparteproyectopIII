import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HostListener } from '@angular/core';

import { WebSocketService } from '../../services/web-socket.service';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Socket } from 'socket.io-client';
import { Observable, retry } from 'rxjs';
import { getLocaleDateFormat } from '@angular/common';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  div = document.createElement('type');
  getData(val: string): void {
    const id = this.activated.snapshot.params['id'];
    this.contador++;
    if (this.contador == 1) {
      this.TypingData.id = id;
      this.webService.emit('typing', this.TypingData);
    }
  }
  userChat = {
    user: '',
    text: '',
    mensaje: '',
    tiempo: '',
  };
  userData = {
    id: '',
  };
  TypingData = {
    id: '',
  };
  contador = 0;
  myUsers: any;
  myUsersleft: any;
  myMessages: any;
  myTyping: any;
  messagecont = 0;
  usercont = 0;
  verificador=false;
  eventName = 'send-message';
  @HostListener('window:beforeunload')
  onUnload() {}
  constructor(
    private activated: ActivatedRoute,
    private webService: WebSocketService
  ) {}

  ngOnInit(): void {
    const id = this.activated.snapshot.params['id'];
    const contador = this.messagecont.toString();
    this.userChat.user = id;
    this.userData.id = id;
    this.userChat.mensaje = contador;
    this.webService.emit('conectado', this.userData);
    this.webService.listen('usuariosc').subscribe((data) => {
      this.myUsers = data;
      console.log(this.myUsers);
    });
    this.webService.listen('text-event').subscribe((data) => {
      this.myMessages = data;
      this.myTyping = [];
      console.log(this.verificador)
      if(this.verificador===false){
        this.reproducir();
      }
    
    });
    this.webService.listen('usuariosd').subscribe((data) => {
      this.myUsersleft = data;
      console.log(this.myUsersleft);
    });
    this.webService.listen('escribiendo').subscribe((data) => {
      this.myTyping = data + ' Esta escribiendo';
    });
  }

  myMessage(): void {
    this.messagecont++;
    const mensaje = this.messagecont.toString();
    this.userChat.mensaje = mensaje;
    this.userChat.tiempo = Date.now().toString();
    this.webService.emit(this.eventName, this.userChat);
    this.userChat.text = '';
    this.myTyping = [];
    this.contador = 0;
    this.verificador=false;

    
  }
  reproducir() {
    const audio = new Audio('assets/notificacion.mp3');
    audio.play();
  }
  salir(): void {
    const id = this.activated.snapshot.params['id'];
    this.userData.id = id;
    this.webService.emit('desconectado', this.userData);
    location.href = '';
  }
}
