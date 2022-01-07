import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { Chat, chatMessage, ChatService } from "./chat.service";

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat.component.html',
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit ,OnDestroy {
  chats: Chat[] = []
  activeChat: Chat;
  messages: chatMessage[] = [];
  page=1;
  connection;
  message;
  isLoading= false;
  
  constructor(private route: ActivatedRoute ,private chatService:ChatService, private authService: AuthService) {}

  sendMessage(el){
    this.chatService.sendMessage(this.activeChat.id, el.value);
    el.value = '';
  }
  
  scrollHeight
  onScroll($event: Event) {
    if ($event.target['scrollTop']<=0){
      this.isLoading = true;
      this.el = this.messageListItem.last.nativeElement
      this.chatService.getChatMessage(this.activeChat.id, this.page +1).subscribe(
        (messageData: {data:{data: chatMessage[]}})=>{
          this.page += 1
          this.isLoading = false
          this.isLoad = true
          this.messages = this.messages.concat(this.messages ,messageData.data.data)
        }
      )
    }
  }

  @ViewChild('messagesList') messagesListEl: ElementRef
  scrollContainer: any;
  ngOnInit() {
    this.route.data.subscribe(chatData => {
      this.chats = chatData[0];
      this.changeChat(chatData[0])
    })

    this.chatService.connect();
    
    this.connection = this.chatService.getChatList().subscribe(
      (chatListData: {data: {data: Chat[]}})=> {
        this.chats = chatListData.data.data;
        this.changeChat(this.chats[0])
        this.chatService.getMessages().subscribe( (messageData: {msg: string, sent_by: number}) => {
          const message: chatMessage = {
            id: this.messages[0].id+1,
            chat_id: this.activeChat.id,
            sent_by: messageData.sent_by,
            text: messageData.msg,
            created_at: null,
            updated_at: null,
            deleted_at: null
          }
          this.messageListItem.first.nativeElement['classList'].remove('mb-3')
          this.messages.unshift(message)
          this.isFirstLoad = true
        })
      }
    )
  }

  isLoad: boolean = false
  isReLoad: boolean = false
  isFirstLoad: boolean= true;
  el: Element;
  lastIdex: string


  @ViewChildren('messageListItem') messageListItem: QueryList<ElementRef>
  getMessageSide(el: Element,message: chatMessage, isLast: boolean, isFirst: boolean) {
    if(isFirst) {
      el.classList.add('mb-3')
    }
    
    if (isLast && this.isLoad) {
      this.isLoad= false
      this.el.scrollIntoView({
        behavior: 'auto',
        block: 'center'
       })
    }

    if(isFirst && this.isFirstLoad) {
      this.el = el
    }

    if (isLast && this.isFirstLoad) {
      this.isFirstLoad = false
      this.el.scrollIntoView()
    }

    if(message.sent_by === this.authService.user.value.id) {
      return true
    } else {
      return false
    }
  }

  changeChat(chat: Chat) {
    this.activeChat = chat
    this.chatService.getChatMessage(this.activeChat.id).subscribe(
      (messageData: {data: {data: chatMessage[]}})=> {
        this.messages = messageData.data.data;
      }
    )
  }
  
  getOtherUser(chat: Chat) {
    if(chat){
      if (chat.opened_user_id === this.authService.user.value.id){
        return chat.opener_user_id
      } else {
        return chat.opened_user_id
      }
    } else {
      return ""
    }
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}



