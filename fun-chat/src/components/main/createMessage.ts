interface MessageStatus {
  isDelivered: boolean;
  isReaded: boolean;
  isEdited: boolean;
}

interface MessagePayload {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: MessageStatus;
}

interface ServerResponse {
  id: string;
  type: string;
  payload: {
    message: MessagePayload;
  };
}

// export default function createMessage(response: ServerResponse) {
//  // Проверяем, что payload и message существуют
//  if (response.payload && response.payload.message) {
//     const {
//       payload: {
//         message: {
//           id: messageId,
//           from: messageFrom,
//           to: messageTo,
//           text: messageText,
//           datetime: messageDatetime,
//           status: {
//             isDelivered: messageIsDelivered,
//             isReaded: messageIsReaded,
//             isEdited: messageIsEdited,
//           }
//         }
//       }
//     } = response;

//     console.log(`createMessage: ${messageText}`);
//     // renderMessage(message);

// } else {
//     console.error('Payload or message is undefined');
//  }
// }

export default function createMessage(response: ServerResponse) {
  if (response.payload && response.payload.message) {
    const {
      payload: { message },
    } = response;

    renderMessage(message);
  } else {
    console.error("Payload or message is undefined");
  }
}

function renderMessage(message: MessagePayload) {
  const dialogueNameElement = document.querySelector(
    ".dialogue-name",
  ) as HTMLElement;
  const dialogueNameText = dialogueNameElement
    ? dialogueNameElement.textContent
    : "";
  const messageClass = dialogueNameText === message.from ? "m-left" : "m-right";

  const date = new Date(message.datetime);
  const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const messageHtml = `
    <div class="message ${messageClass}">
      <span class="message-who-sent">${message.from}</span>
      <span class="message-date">${formattedDate}</span>
      <div class="message-text">${message.text}</div>
      <span class="message-status">${message.status.isDelivered ? "delivered" : "not delivered"}</span>
    </div>
 `;

  const messagesContainer = document.querySelector(".messages-canvas");
  if (messagesContainer) {
    messagesContainer.innerHTML += messageHtml;
  }
}
