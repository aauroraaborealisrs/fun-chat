import sendRequest from "../ws/socket";

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