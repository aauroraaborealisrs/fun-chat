import sendRequest from "./socket";
import { markAsRead, markAsReadHistory } from "./markAsRead";
import { responsesArray, markToReadFromHistory } from "./socket";
import createElement from "../utilities/createElement";

export function handleLogoutButtonClick(event: MouseEvent) {
  event.preventDefault();
  const login = sessionStorage.getItem("login");
  const password = sessionStorage.getItem("password");
  const request = {
    id: crypto.randomUUID(),
    type: "USER_LOGOUT",
    payload: {
      user: {
        login: `${login}`,
        password: `${password}`,
      },
    },
  };
  sendRequest(JSON.stringify(request));
}

export function setupMessagesCanvasHandlers(canvasElement: Element | null) {
  if (!canvasElement) return;

  let isUserScrolling = false;

  canvasElement.addEventListener("mousedown", () => {
    isUserScrolling = true;
  });

  canvasElement.addEventListener("mouseup", () => {
    isUserScrolling = false;
  });

  canvasElement.addEventListener("touchstart", () => {
    isUserScrolling = true;
  });

  canvasElement.addEventListener("touchend", () => {
    isUserScrolling = false;
  });

  canvasElement.addEventListener("wheel", () => {
    markAsRead(responsesArray);
    markAsReadHistory(markToReadFromHistory);
    isUserScrolling = true;
  });

  canvasElement.addEventListener("scroll", () => {
    if (isUserScrolling) {
      markAsRead(responsesArray);
      markAsReadHistory(markToReadFromHistory);
    }
  });

  canvasElement.addEventListener("click", () => {
    markAsRead(responsesArray);
    markAsReadHistory(markToReadFromHistory);
  });
}

export function deleteButtonClickHandler(id: string) {
  const request = {
    id: crypto.randomUUID(),
    type: "MSG_DELETE",
    payload: {
      message: {
        id: id,
      },
    },
  };
  sendRequest(JSON.stringify(request));

  const dialogue = document.querySelector(".messages-canvas") as HTMLElement;
  const messageElement = dialogue.querySelector(`[id="${id}"]`) as HTMLElement;
  dialogue.removeChild(messageElement);
}

export function editButtonClickHandler(id: string) {
  let editHandlerAdded = false;
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

      editHandlerAdded = true;
    });
    editHandlerAdded = true;
  }
}

export function handleRightMessageClick(
  messageDiv: HTMLElement,
  messageId: string,
) {
  let clickCount = 0;

  messageDiv.addEventListener("click", function (e) {
    e.stopPropagation();
    clickCount++;

    let listContainer = messageDiv.querySelector(
      ".actions-container",
    ) as HTMLElement;

    if (listContainer) {
      listContainer.style.display = clickCount % 2 === 0 ? "none" : "block";
    } else {
      listContainer = createElement("div", "actions-container", "", messageDiv);

      const editB = createElement("div", "list-item", "Edit", listContainer);
      editB.id = messageId;

      editB.addEventListener("click", function (event) {
        event.stopPropagation();
        editButtonClickHandler(editB.id);
        const sendElement = document.getElementById(
          "send",
        ) as HTMLButtonElement;
        if (sendElement) {
          sendElement.disabled = true;
        }
      });

      const deleteB = createElement(
        "div",
        "list-item",
        "Delete",
        listContainer,
      );
      deleteB.id = messageId;

      deleteB.addEventListener("click", function (event) {
        event.stopPropagation();
        deleteButtonClickHandler(deleteB.id);
      });
    }
  });
}
