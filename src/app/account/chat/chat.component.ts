import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { Chat, chatMessage, ChatService } from "./chat.service";

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat.component.html'
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
    console.log(el);
    console.log(el.value);
    
    this.chatService.sendMessage(this.activeChat.id, el.value);
    el.value = '';
  }

  
  scrollHeight
  onScroll($event: Event) {
    if ($event.target['scrollTop']<=0){
      this.isLoading = true;
      // const el: Element = this.messageListItem.last.nativeElement
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
      this.changeChat(this.chats[0])
    })

    this.chatService.connect();
    console.log(this.messageListItem);

    
    this.connection = this.chatService.getChatList().subscribe(
      (chatListData: {data: {data: Chat[]}})=> {
        console.log(chatListData);
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
          console.log(this.messages);
        
          
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
    // this.el.push(el)
    // if(isLast && !this.isLoad) {
    //   this.lastIdex = el.id;
    //   this.isLoad = true
    //   this.el[10].scrollIntoView();
    // }

    // if(isFirst && this.isReLoad) {
    //   console.log(this.lastIdex);
      
    //   this.el[this.lastIdex.valueOf()].scrollIntoView({
    //     behavior: 'auto',
    //     block: 'center',
    //     inline: 'center'
    // })
    // }
    // if(isLast && this.isReLoad) {
    //   this.isReLoad = false;
    //   this.lastIdex = el.id
    // }

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
        console.log(messageData);
        this.messages = messageData.data.data;
      }
    )
  }
  
  getOtherUser(chat: Chat) {
    if (chat.opened_user_id === this.authService.user.value.id){
      return chat.opener_user_id
    } else {
      return chat.opened_user_id
    }
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}



