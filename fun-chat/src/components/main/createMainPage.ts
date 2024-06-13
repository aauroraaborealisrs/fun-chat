import createElement from "../utilities/createElement";

export default function createMainPage(): HTMLElement {
  const container = createElement("div", "container");
  const header = createElement("header", "header");
  const headerName = createElement("span", "header-name");
  const headerTitle = createElement("span", "", "Fun Chat");
  const buttonsDiv = createElement("div", "buttons");
  const infoButton = createElement("button", "", "Info");
  infoButton.id = "info-button";
  const logoutButton = createElement("button", "", "Log Out");
  logoutButton.id = "logout-button";

  const main = createElement("main", "main");
  const usersSection = createElement("section", "users");
  const userSearchInput = document.createElement("input");
  userSearchInput.type = "text";
  userSearchInput.placeholder = "Поиск";
  userSearchInput.className = "user-search";
  userSearchInput.id = "user-search";
  const usersList = createElement("ul", "users-list");

  const dialogueSection = createElement("section", "dialogue");
  const dialogueHeader = createElement("div", "dialogue-header");
  const dialogueName = createElement(
    "span",
    "dialogue-name",
    "Тут ничего нет. Найдите собеседника из списка слева",
  );
  const dialogueStatus = createElement("span", "dialogue-status");
  const messagesCanvas = createElement("div", "messages-canvas");
  messagesCanvas.classList.add("hidden");
  const dialogueInput = createElement("div", "dialogue-input");
  dialogueInput.classList.add("hidden");
  const dialogueMessageInput = document.createElement("input");
  dialogueMessageInput.type = "text";
  dialogueMessageInput.placeholder = "Напишите";
  dialogueMessageInput.className = "dialogue-message";
  const sendButton = createElement(
    "button",
    "button",
    "Send",
  ) as HTMLButtonElement;
  sendButton.id = "send";
  sendButton.disabled = true;
  const editButton = createElement(
    "button",
    "button",
    "Edit",
  ) as HTMLButtonElement;
  editButton.id = "edit";
  editButton.disabled = true;

  const footer = createElement("footer", "footer");
  const footerRss = createElement("span", "footer-rss", "RSSchool");
  const footerLogo = createElement("div", "footer-logo");
  const footerLink = document.createElement("a");
  footerLink.href = "https://github.com/aauroraaborealisrs";
  footerLink.target = "_blank";
  footerLink.className = "footer-link";
  const footerName = createElement("span", "footer-name", "Kate Sharai");
  const footerYear = createElement("span", "footer-year", "2024");

  footerLink.appendChild(footerName);
  buttonsDiv.appendChild(infoButton);
  buttonsDiv.appendChild(logoutButton);
  header.append(headerName, headerTitle, buttonsDiv);
  usersSection.append(userSearchInput, usersList);
  dialogueHeader.append(dialogueName, dialogueStatus);
  dialogueInput.append(dialogueMessageInput, sendButton, editButton);
  dialogueSection.append(dialogueHeader, messagesCanvas, dialogueInput);
  main.append(usersSection, dialogueSection);
  footer.append(footerRss, footerLogo, footerLink, footerYear);
  container.append(header, main, footer);

  return container;
}
