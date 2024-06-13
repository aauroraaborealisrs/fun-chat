import { ServerResponse } from "../utilities/interfaces";
import { renderMessage } from "./renderMessage";

export function createMessage(response: ServerResponse) {
  if (response.payload && response.payload.message) {
    const {
      payload: { message },
    } = response;

    renderMessage(message);
  } else {
    console.error("Payload or message is undefined");
  }
}
