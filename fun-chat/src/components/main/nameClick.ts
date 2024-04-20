export default function nameClick() {
  const listItems = document.querySelectorAll(".user_li");
  console.log(listItems);
  listItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      if (e.target) {
        const userName = (e.target as HTMLElement).textContent;
        const isActive = (e.target as Element).classList.contains(
          "user_active",
        );
        // Update the dialogue-name element
        const dialogueNameElement = document.querySelector(".dialogue-name");
        if (dialogueNameElement) {
          dialogueNameElement.textContent = userName;
        }

        // Update the dialogue-status element
        const dialogueStatusElement =
          document.querySelector(".dialogue-status");
        if (dialogueStatusElement) {
          // Remove existing status classes
          dialogueStatusElement.classList.remove("online-text", "offline-text");

          // Add the new status class based on the isActive condition
          if (isActive) {
            dialogueStatusElement.classList.add("online-text");
          } else {
            dialogueStatusElement.classList.add("offline-text");
          }

          // Update the text content
          dialogueStatusElement.textContent = isActive ? "online" : "offline";
        }
      }

      console.log("User list item clicked:", e.target);
    });
  });
}
