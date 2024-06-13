import { renderMessage } from "./createMessage";
import { MessagePayload } from "../utilities/interfaces";

export function handleMessages(response: {
  payload: { messages: MessagePayload[] };
}) {
  const dialogue = document.querySelector(".messages-canvas");
  const existingTempElement = dialogue?.querySelector(".temp");

  if (!existingTempElement) {
    const temp = document.createElement("div");
    temp.className = "temp";
    temp.textContent = "Тут ничего пока нет";
    dialogue?.appendChild(temp);
  } else {
    response.payload.messages.forEach((message: MessagePayload) => {
      renderMessage(message);
    });
  }
}

export function markArReadMessages(messageId: string) {
  const messageElement = document.getElementById(messageId);
  if (messageElement) {
    const statusElement = messageElement.querySelector(".message-status");
    if (statusElement) {
      statusElement.textContent = "Read";
    }
  }
}

export function showEmpty() {
  const dialogue = document.querySelector(".messages-canvas");
  const existingTempElement = dialogue?.querySelector(".temp");

  if (!existingTempElement) {
    const temp = document.createElement("div");
    temp.className = "temp";
    temp.textContent = "Тут ничего пока нет";
    dialogue?.appendChild(temp);
  }
}
