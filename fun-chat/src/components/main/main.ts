import mainRenderer from "./mainRanderer";
import sendMessage from "../ws/socket";
import "../../css/main.css";

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

    sendMessage(JSON.stringify(request));
  }

  private sendUserUnactiveRequest() {
    const request = {
      id: crypto.randomUUID(),
      type: "USER_INACTIVE",
      payload: null,
    };

    sendMessage(JSON.stringify(request));
  }
}
