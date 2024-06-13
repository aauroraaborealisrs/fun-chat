import createElement from "../utilities/createElement";
import { deleteButtonClickHandler } from "./deleteButtonClickHandler";
import { editButtonClickHandler } from "./editButtonClickHandler";

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
