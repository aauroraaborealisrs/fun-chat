import mainRenderer from "./mainRanderer";
import { renderActiveUserList } from "./userListRenderer";
import sendMessage from "./socket";
interface User {
  login: string;
  isLogined: boolean;
}

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
