import { Component, ElementRef, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from 'src/app/auth/auth.service'
import { Chat, chatMessage, ChatService } from './chat.service'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { Observable } from 'rxjs/internal/Observable'

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  chats: Chat[] = []
  activeChat: Chat = null
  messages: chatMessage[] = []
  page = 1
  connection
  message
  isLoading = false
  private _ChatLoadedSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public ChatLoadedObs: Observable<boolean> = this._ChatLoadedSub.asObservable();

  constructor(private route: ActivatedRoute, private chatService: ChatService, private authService: AuthService) {}

  sendMessage(el) {
    this.chatService.sendMessage(this.activeChat.id, el.value)
    el.value = ''
  }

  scrollHeight
  onScroll($event: Event) {
    if ($event.target['scrollTop'] <= 0) {
      this.isLoading = true
      this.el = this.messageListItem.last.nativeElement
      this.chatService
        .getChatMessage(this.activeChat.id, this.page + 1)
        .subscribe((messageData: { data: { data: chatMessage[] } }) => {
          this.page += 1
          this.isLoading = false
          this.isLoad = true
          this.messages = this.messages.concat(this.messages, messageData.data.data)
        })
    }
  }

  @ViewChild('messagesList') messagesListEl: ElementRef
  scrollContainer: any
  ngOnInit() {
    this.ChatLoadedObs.subscribe((data)=>{console.log(data);
    })
    this.route.data.subscribe((chatData) => {
      this.chats = chatData[0]
      this._ChatLoadedSub.next(true);
      if (this.chats.length > 0) {
        this.changeChat(this.chats[0])
      }
      this.chatService.connect()
      this.connection = this.chatService.getMessages().subscribe((messageData: { msg: string; sent_by: number }) => {
        const message: chatMessage = {
          id: this.messages[0] ? this.messages[0].id + 1 : 1,
          chat_id: this.activeChat.id,
          sent_by: messageData.sent_by,
          text: messageData.msg,
          created_at: null,
          updated_at: null,
          deleted_at: null,
        }
        this.messageListItem.first.nativeElement['classList'].remove('mb-3')
        this.messages.unshift(message)
        this.isFirstLoad = true
      })
      this.route.queryParams.subscribe((params) => {
        console.log(params)
        if (this.chats) {
          for (let chat of this.chats) {
            if (chat.id.toString() === params.chat_id) {
              this.changeChat(chat)
              return
            }
          }
        }

        console.log(this.chats)
      })
    })

    // this.chatService.connect();

    // this.connection = this.chatService.getChatList().subscribe(
    //   (chatListData: {data: {data: Chat[]}})=> {
    //     this.chats = chatListData.data.data;
    //     // this.changeChat(this.chats[0])
    //     // this.chatService.getMessages().subscribe( (messageData: {msg: string, sent_by: number}) => {
    //     //   const message: chatMessage = {
    //     //     id: this.messages[0].id+1,
    //     //     chat_id: this.activeChat.id,
    //     //     sent_by: messageData.sent_by,
    //     //     text: messageData.msg,
    //     //     created_at: null,
    //     //     updated_at: null,
    //     //     deleted_at: null
    //     //   }
    //     //   this.messageListItem.first.nativeElement['classList'].remove('mb-3')
    //     //   this.messages.unshift(message)
    //     //   this.isFirstLoad = true
    //     // })
    //   }
    // )
  }

  isLoad: boolean = false
  isReLoad: boolean = false
  isFirstLoad: boolean = true
  el: Element
  lastIdex: string

  @ViewChildren('messageListItem') messageListItem: QueryList<ElementRef>
  getMessageSide(el: Element, message: chatMessage, isLast: boolean, isFirst: boolean) {
    if (isFirst) {
      el.classList.add('mb-3')
    }

    if (isLast && this.isLoad) {
      this.isLoad = false
      this.el.scrollIntoView({
        behavior: 'auto',
        block: 'center',
      })
    }

    if (isFirst && this.isFirstLoad) {
      this.el = el
    }

    if (isLast && this.isFirstLoad) {
      this.isFirstLoad = false
      this.el.scrollIntoView()
    }

    if (message.sent_by === this.authService.user.value.id) {
      return true
    } else {
      return false
    }
  }

  changeChat(chat: Chat) {
    console.log(chat)
    this.activeChat = chat

    this.chatService.getChatMessage(this.activeChat.id).subscribe((messageData: { data: { data: chatMessage[] } }) => {
      this.messages = messageData.data.data
      // console.log(this.messages)
    })
  }

  // getOtherUser(chat: Chat) {
  //   if(chat){
  //     if (chat.opened_user_id === this.authService.user.value.id){
  //       return chat.opener_user_id
  //     } else {
  //       return chat.opened_user_id
  //     }
  //   } else {
  //     return ""
  //   }
  // }

  getUsername(chat: Chat) {
    var name = chat.other_user.email.split('@')[0]
    return name
  }

  ngOnDestroy() {
    this.connection.unsubscribe()
    this.chatService.disconnect()
  }

  getLink() {
    console.log(this.activeChat.opener_user_id)
    console.log(this.activeChat.ad_id)

    return '/home/{{activeChat.opener_user_id}}/{{activeChat.ad_id}}'
  }
}
