import { HttpClient } from "@angular/common/http";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Resolver } from "dns";
import { map } from "rxjs/internal/operators/map";
import { AuthService } from "src/app/auth/auth.service";
import { Chat, ChatService } from "./chat.service";


export class ChatResolverService implements Resolve<Chat[]> {
  constructor(private http: HttpClient, private authService: AuthService, private chatService: ChatService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.chatService.getChatList().pipe(
      map((chatData: {data: {data: Chat[]}}) => {
        return chatData.data.data
      })
    );
  }
}