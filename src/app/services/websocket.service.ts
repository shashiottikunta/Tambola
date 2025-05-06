import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  
  private socket :any;

  constructor() {
    console.log(localStorage.getItem('gameId'))
    this.socket = webSocket(`ws://18.210.85.136:8010/ws/${localStorage.getItem('gameId')}`);

   }

  getMessages() {
    console.log('yesss')
    return this.socket.asObservable();
  }

  sendMessage(message: string) {
    this.socket.next(message);
  }
}
