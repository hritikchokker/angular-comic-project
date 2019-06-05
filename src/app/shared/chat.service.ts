import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { Message } from './data-structures';

@Injectable()
export class ChatService {
  private url = 'http://localhost:5000';
  private socket;

  public sendMessage(message) {
    this.socket.emit('add-message', message);
  }

  public getMessages() {
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (message: Message) => {
        observer.next(message);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}
