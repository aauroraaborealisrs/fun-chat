import sendMessage from "./sendMessage";
import { markAsRead, markAsReadHistory } from "./markAsRead";
import { responsesArray, markToReadFromHistory } from "./socket";

export function updateUserListBasedOnSearch(
  userSearchElement: HTMLElement | null,
  userListItems: NodeListOf<Element>,
) {
  if (!userSearchElement) return;

  userSearchElement.addEventListener("input", function (e) {
    const target = e.target as HTMLInputElement;
    const searchValue = target.value.toLowerCase();

    userListItems.forEach((item) => {
      const itemText = item.textContent?.toLowerCase() || "";
      if (itemText.includes(searchValue)) {
        (item as HTMLElement).style.display = "";
      } else {
        (item as HTMLElement).style.display = "none";
      }
    });
  });
}

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
