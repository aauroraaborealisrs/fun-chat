import sendRequest from "../ws/socket";
import { Message, ServerResponse } from "../utilities/interfaces";

export function markAsRead(messages: ServerResponse[]) {
  messages.forEach((message) => {
    if (
      message.payload &&
      message.payload.message &&
      message.payload.message.id !== null
    ) {
      const request = {
        id: message.id,
        type: "MSG_READ",
        payload: {
          message: {
            id: message.payload.message.id,
            status: {
              isReaded: true,
            },
          },
        },
      };
      sendRequest(JSON.stringify(request));
    }
  });
}

export function markAsReadHistory(messages: Message[]) {
  messages.forEach((message) => {
    if (!message.status.isReaded) {
      const request = {
        id: message.id,
        type: "MSG_READ",
        payload: {
          message: {
            id: message.id,
            status: {
              isReaded: true,
            },
          },
        },
      };
      sendRequest(JSON.stringify(request));
    }
  });
}
