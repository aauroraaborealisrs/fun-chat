import { handleRightMessageClick } from "../userEvents/handleRightMessageClick";
import createElement from "../utilities/createElement";
import { MessagePayload, ServerResponse } from "../utilities/interfaces";

function autoScrollToBottom(element: HTMLElement) {
  element.scrollTop = element.scrollHeight;
}

let isAutoScrolling = false;

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

  const messageDiv = createElement("div", `message ${messageClass}`);
  messageDiv.id = message.id;

  const messageWhoSent = createElement(
    "span",
    "message-who-sent",
    message.from,
    messageDiv,
  );
  const messageDate = createElement(
    "span",
    "message-date",
    formattedDate,
    messageDiv,
  );
  const messageText = createElement(
    "span",
    "message-text",
    message.text,
    messageDiv,
  );
  const messageStatus = createElement("span", "message-status");

  let messageStatusText;

  switch (true) {
    case message.status.isReaded:
      messageStatusText = "readed";
      break;
    case message.status.isDelivered:
      messageStatusText = "sent";
      break;
    default:
      messageStatusText = "delivered";
  }

  messageStatus.textContent = messageStatusText;
  messageDiv.appendChild(messageStatus);

  const messageEdited = createElement(
    "span",
    "message-edited",
    message.status.isEdited ? "edited" : "",
    messageDiv,
  );

  if (messageDiv.classList.contains("m-right")) {
    handleRightMessageClick(messageDiv, message.id);
  }

  const messagesContainer = document.querySelector(".messages-canvas");
  if (messagesContainer) {
    messagesContainer.appendChild(messageDiv);
  }

  if (dialogue) {
    autoScrollToBottom(dialogue);
  }
}

export { isAutoScrolling };
