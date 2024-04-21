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

import sendRequest from "./socket";

let isAutoScrolling = false;

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

  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${messageClass}`;
  messageDiv.id = message.id;

  const messageWhoSent = document.createElement("span");
  messageWhoSent.className = "message-who-sent";
  messageWhoSent.textContent = message.from;
  messageDiv.appendChild(messageWhoSent);

  const messageDate = document.createElement("span");
  messageDate.className = "message-date";
  messageDate.textContent = formattedDate;
  messageDiv.appendChild(messageDate);

  const messageText = document.createElement("div");
  messageText.className = "message-text";
  messageText.textContent = message.text;
  messageDiv.appendChild(messageText);

  const messageStatus = document.createElement("span");
  messageStatus.className = "message-status";
  messageStatus.textContent = message.status.isDelivered ? "sent" : "delivered";
  messageDiv.appendChild(messageStatus);

  const messageEdited = document.createElement("span");
  messageEdited.className = "message-edited";
  messageEdited.textContent = message.status.isEdited ? "edited" : "";
  messageDiv.appendChild(messageEdited);

  let clickCount = 0;

  if (messageDiv.classList.contains("m-right")) {
    messageDiv.addEventListener("click", function (e) {
      e.stopPropagation();

      clickCount++;

      const listContainer = messageDiv.querySelector(
        ".actions-container",
      ) as HTMLElement;
      if (listContainer) {
        if (clickCount % 2 === 0) {
          listContainer.style.display = "none";
        } else {
          listContainer.style.display = "block";
        }
      } else {
        const newListContainer = document.createElement("div");
        newListContainer.className = "actions-container";

        const editB = document.createElement("div");
        editB.className = "list-item";
        editB.textContent = "Edit";
        newListContainer.appendChild(editB);

        editB.addEventListener("click", function (event) {
          event.stopPropagation();
          editButtonClickHandler(message.id);
          console.log("Edit button clicked");
          const sendElement = document.getElementById(
            "send",
          ) as HTMLButtonElement;
          if (sendElement) {
            sendElement.disabled = true;
          }
        });

        const deleteB = document.createElement("div");
        deleteB.className = "list-item";
        deleteB.textContent = "Delete";
        newListContainer.appendChild(deleteB);

        deleteB.addEventListener("click", function (event) {
          event.stopPropagation();
          console.log("Delete button clicked");
        });

        messageDiv.appendChild(newListContainer);
      }
    });
  }
  const messagesContainer = document.querySelector(".messages-canvas");
  if (messagesContainer) {
    messagesContainer.appendChild(messageDiv);
  }

  if (dialogue) {
    autoScrollToBottom(dialogue);
  }
}

function editButtonClickHandler(id: string) {
  const dialogue = document.querySelector(".messages-canvas") as HTMLElement;
  if (!dialogue) {
    console.error("Dialogue container not found");
    return;
  }

  const messageElement = dialogue.querySelector(`[id="${id}"]`) as HTMLElement;
  if (!messageElement) {
    console.error(`Message with id ${id} not found`);
    return;
  }

  const messageTextElement = messageElement.querySelector(
    ".message-text",
  ) as HTMLElement;
  if (!messageTextElement) {
    console.error(`Message text element not found for message with id ${id}`);
    return;
  }

  const messageText = messageTextElement.textContent;
  console.log(`Message text: ${messageText}`);

  const dialogueMessageElement = document.querySelector(
    ".dialogue-message",
  ) as HTMLInputElement;
  if (dialogueMessageElement) {
    dialogueMessageElement.value = messageText ?? "";
  } else {
    console.error("Dialogue message element not found");
  }

  const sendElement = document.getElementById("send") as HTMLButtonElement;
  if (sendElement) {
    sendElement.disabled = true;
  }

  const editElement = document.getElementById("edit") as HTMLButtonElement;
  if (editElement) {
    editElement.disabled = false;
    editElement.addEventListener("click", function (event) {
      editElement.disabled = true;
      const dialogueMessageInput = document.querySelector(
        ".dialogue-message",
      ) as HTMLInputElement;
      if (dialogueMessageInput.value.trim() == "" && editElement.disabled) {
        sendElement.disabled = false;
        console.log("я в createMess");
      }
      const dialogueMessageElement = document.querySelector(
        ".dialogue-message",
      ) as HTMLInputElement;
      if (dialogueMessageElement) {
        const messageContent = dialogueMessageElement.value;

        const request = {
          id: crypto.randomUUID(),
          type: "MSG_EDIT",
          payload: {
            message: {
              id: id,
              text: messageContent,
            },
          },
        };
        sendRequest(JSON.stringify(request));
        messageTextElement.textContent = messageContent;
        const messageEdited = messageElement.querySelector(
          ".message-edited",
        ) as HTMLElement;
        messageEdited.textContent = "edited";
      }

      console.log("editElement button clicked");
    });
  }
}
export { isAutoScrolling };
