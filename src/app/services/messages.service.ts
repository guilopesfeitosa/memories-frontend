import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messageTitle: string = '';
  messageDescription: string = '';
  messageBtnText: string = '';
  visible: boolean = false;

  add(
    messageTitle: string,
    messageDescription: string,
    messageBtnText: string,
  ) {
    this.visible = true;
    this.messageTitle = messageTitle;
    this.messageDescription = messageDescription;
    this.messageBtnText = messageBtnText;

    setTimeout(() => {
      this.clear();
    }, 4000);
  }

  clear() {
    this.visible = false;
  }
}
