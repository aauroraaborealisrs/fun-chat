import sendRequest from "./socket";

interface ServerResponse {
  id: string;
  type: string;
  payload: {
    message: {
      id: string;
      from: string;
      to: string;
      text: string;
      datetime: number;
      status: {
        isDelivered: boolean;
        isReaded: boolean;
        isEdited: boolean;
      };
    };
  };
}

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


interface Message {
  datetime: number;
  from: string;
  id: string;
  status: {
     isDelivered: boolean;
     isReaded: boolean;
     isEdited: boolean;
  };
  text: string;
  to: string;
 }

 export function markAsReadHistory (messages: Message[]) {
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