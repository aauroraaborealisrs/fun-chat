import sendRequest from "../ws/socket";

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
  