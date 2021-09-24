import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit{

  messages: String[] = []
  ngOnInit() {

  }

  onInvia(message: string) {
    this.messages.push(message);
  }
}