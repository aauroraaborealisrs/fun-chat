import sendRequest from "./socket";
export default function sendMessage(name: string, messsage: string) {
  console.log("sent");
  console.log(`name ${name}, mes ${messsage}`);

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

  console.log(request);

  sendRequest(JSON.stringify(request));
}
