import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { map } from 'rxjs/internal/operators/map'
import { AuthService } from 'src/app/auth/auth.service'
import { Chat, ChatService } from './chat.service'

@Injectable({
  providedIn: 'root',
})
export class ChatResolverService implements Resolve<Chat[]> {
  constructor(private http: HttpClient, private authService: AuthService, private chatService: ChatService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route.queryParams)
    return this.chatService.getChatList().pipe(
      map((chatData: { data: Chat[] }) => {
        console.log(chatData)

        return chatData.data
      }),
    )
  }
}
