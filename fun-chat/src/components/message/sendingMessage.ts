import sendMessage from "../message/sendMessage";
import { markAsRead, markAsReadHistory } from "./markAsRead";
import { responsesArray, markToReadFromHistory } from "../ws/socket";

export function sendingMessage() {
    const sendButton = document.getElementById("send") as HTMLButtonElement;
    const dialogueMessageElement = document.querySelector(
      ".dialogue-message",
    ) as HTMLInputElement;
  
    markAsRead(responsesArray);
    markAsReadHistory(markToReadFromHistory);
  
    const dialogueNameElement = document.querySelector(
      ".dialogue-name",
    ) as HTMLElement;
    const name = dialogueNameElement.textContent as string;
    const message = dialogueMessageElement.value.trim();
  
    if (message !== "") {
      sendButton.disabled = true;
      sendMessage(name, message);
    }
  }
  