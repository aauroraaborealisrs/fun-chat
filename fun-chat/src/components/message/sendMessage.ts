import sendRequest from "../ws/socket";
export default function sendMessage(name: string, messsage: string) {
  const dialogueMessageElement = document.querySelector(
    ".dialogue-message",
  ) as HTMLInputElement;
  dialogueMessageElement.value = "";

  const request = {
    id: crypto.randomUUID(),
    type: "MSG_SEND",
    payload: {
      message: {
        to: name,
        text: messsage,
      },
    },
  };

  sendRequest(JSON.stringify(request));
}
