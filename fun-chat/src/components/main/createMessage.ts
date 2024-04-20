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


function autoScrollToBottom(element: HTMLElement) {
 element.scrollTop = element.scrollHeight;
}

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

export function renderMessage(message: MessagePayload) {
  const dialogue = document.querySelector(".messages-canvas") as HTMLElement;
  if (dialogue) {
    autoScrollToBottom(dialogue);
   }
  const temp = document.querySelector(".temp") as HTMLElement | null;
  if (temp && dialogue) {
    dialogue.removeChild(temp);
  }

  const dialogueNameElement = document.querySelector(
    ".dialogue-name",
  ) as HTMLElement;
  const dialogueNameText = dialogueNameElement
    ? dialogueNameElement.textContent
    : "";
  const messageClass = dialogueNameText === message.from ? "m-left" : "m-right";

  const id = message.id;
  const date = new Date(message.datetime);
  const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const messageHtml = `
    <div class="message ${messageClass}" id= ${id}>
      <span class="message-who-sent">${message.from}</span>
      <span class="message-date">${formattedDate}</span>
      <div class="message-text">${message.text}</div>
      <span class="message-status">${message.status.isDelivered ? "sent" : "delivered"}</span>
    </div>
 `;

  const messagesContainer = document.querySelector(".messages-canvas");
  if (messagesContainer) {
    messagesContainer.innerHTML += messageHtml;
  }

  if (dialogue) {
    autoScrollToBottom(dialogue);
   }
}
