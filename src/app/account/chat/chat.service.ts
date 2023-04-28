import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { io } from 'socket.io-client'
import { AuthService } from 'src/app/auth/auth.service'
import { environment } from 'src/environments/environment.prod'

export interface chatMessage {
  chat_id: number
  created_at: Date
  deleted_at: Date
  id: number
  sent_by: number
  text: String
  updated_at: Date
}

export interface Chat {
  ad_id: number
  closed_by_opened: false
  closed_by_opener: false
  created_at: Date
  deleted_at: Date
  id: number
  last_message: chatMessage
  last_opened_by_opened: null
  last_opened_by_opener: null
  opened_user_id: number
  opener_user_id: number
  other_user: {
    email: string
  }
  updated_at: Date
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket

  constructor(private http: HttpClient, private authService: AuthService) {}

  connect() {
    // this.socket = io('https://ws.librerieriunite.net/ws/libreria/chats')
    this.socket = io('http://localhost:8080' + '/ws/libreria/chats')
    this.socket.on('connection', (pack) => {
      console.log("Connesso");
    })
    this.socket.emit('joining-open-chats', { jwt: this.authService.user.value.token })
  }

  disconnect() {
    this.socket.on('disconnect', () => {
      console.log('Disconnect ' + this.socket.id) // undefined
    })
  }

  sendMessage(chat_id: number, message: string) {
    console.log(message)

    const chat = { id: chat_id, msg: message }
    this.socket.emit('sending-message', { jwt: this.authService.user.value.token, chat: chat })
  }

  getChatList() {
    return this.http.get(`${environment.apiUrl}/api/v1/chats`)
  }

  getChatInPage(id: number) {
    // cerca la chat in una pagina specifica
    this.http.get(`${environment.apiUrl}/api/v1/chats`)
  }

  getChatMessage(id: number, page?: number) {
    if (!page) {
      page = 1
    }
    console.log(id)

    return this.http.get(`${environment.apiUrl}/api/v1/chats/${id.toString()}/messages`, {
      params: {
        page: page,
      },
    })
  }

  getMessages() {
    let observable = new Observable((observer) => {
      this.socket.on('receiving-message', (data) => {
        observer.next(data)
      })
      // return () => {
      //   this.socket.disconnect();
      // };
    })
    return observable
  }
}
