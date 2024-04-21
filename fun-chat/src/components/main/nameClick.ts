import sendRequest from "./socket";

function autoScrollToBottom(element: HTMLElement) {
 element.scrollTop = element.scrollHeight;
}

export default function nameClick() {
  const listItems = document.querySelectorAll(".user_li");
  listItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      if (e.target) {
        const userName = (e.target as HTMLElement).textContent;
        const isActive = (e.target as Element).classList.contains(
          "user_active",
        );
        const dialogueNameElement = document.querySelector(".dialogue-name");
        if (dialogueNameElement) {
          dialogueNameElement.textContent = userName;
        }

        const dialogueStatusElement =
          document.querySelector(".dialogue-status");
        if (dialogueStatusElement) {
          dialogueStatusElement.classList.remove("online-text", "offline-text");

          if (isActive) {
            dialogueStatusElement.classList.add("online-text");
          } else {
            dialogueStatusElement.classList.add("offline-text");
          }

          dialogueStatusElement.textContent = isActive ? "online" : "offline";
        }

        const request = {
          id: crypto.randomUUID(),
          type: "MSG_FROM_USER",
          payload: {
            user: {
              login: userName,
            },
          },
        };

        console.log(request);

        sendRequest(JSON.stringify(request));
      }

      const dialoguehistorycanvas = document.querySelector(
        ".messages-canvas",
      ) as HTMLElement;
      if (dialoguehistorycanvas) {
        dialoguehistorycanvas.innerHTML = "";
      }

      const hiddenElements = document.querySelectorAll('.hidden');
      
      hiddenElements.forEach(element => {
       element.classList.remove('hidden');
      });

      console.log("User list item clicked:", e.target);
    });
  });
}
