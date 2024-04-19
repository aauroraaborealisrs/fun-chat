import mainRenderer from "./mainRanderer";
import { renderActiveUserList } from "./userListRenderer";
import sendMessage from "./socket";
interface User {
  login: string;
  isLogined: boolean;
}

// export default class mainPage {
//  private socket!: WebSocket;

//  constructor() {
//     this.render();
//     this.initWebSocket();
//  }

//  render() {
//     mainRenderer();
//  }

//  private initWebSocket() {
//     this.socket = new WebSocket('ws://localhost:4000');

//     this.socket.onopen = () => {
//       console.log('WebSocket connection opened');
//       this.sendUserActiveRequest();
//     };

//     this.socket.onerror = (error) => {
//       console.error('WebSocket Error:', error);
//     };

//     this.socket.onclose = (event) => {
//       if (event.wasClean) {
//         console.log(`Connection closed cleanly, code=${event.code} reason=${event.reason}`);
//       } else {
//         console.log('Connection died');
//       }
//     };

//     this.socket.onmessage = (event) => {
//       console.log('WebSocket message received:', event.data);
//       this.handleUserActiveResponse(event.data);
//     };
//  }

//  private sendUserActiveRequest() {
//     const request = {
//       id: crypto.randomUUID(),
//       type: "USER_ACTIVE",
//       payload: null,
//     };

//     this.socket.send(JSON.stringify(request));
//  }

// private handleUserActiveResponse(data: string) {
//   const response = JSON.parse(data);
//   if (response.type === "USER_ACTIVE" && response.payload && response.payload.users) {
//      const usersList = document.querySelector('.users-list');
//      if (usersList) {
//       renderUserList(response.payload.users, usersList as HTMLElement);
//     }
//   }
//  }

// }

export default class MainPage {
  constructor() {
    this.render();
    this.sendUserActiveRequest();
    this.sendUserUnactiveRequest();
  }

  render() {
    mainRenderer();
  }

  private sendUserActiveRequest() {
    const request = {
      id: crypto.randomUUID(),
      type: "USER_ACTIVE",
      payload: null,
    };

    console.log(request);

    sendMessage(JSON.stringify(request));
  }

  private sendUserUnactiveRequest() {
    const request = {
      id: crypto.randomUUID(),
      type: "USER_INACTIVE",
      payload: null,
    };

    console.log(request);

    sendMessage(JSON.stringify(request));
  }
}
// private handleUserActiveResponse(data: string) {
//    const response = JSON.parse(data);
//    if (response.type === "USER_ACTIVE" && response.payload && response.payload.users) {
//        const usersList = document.querySelector('.users-list');
//        if (usersList) {
//            renderUserList(response.payload.users, usersList as HTMLElement);
//        }
//    }
// }
