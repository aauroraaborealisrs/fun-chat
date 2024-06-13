function createModal() {
  const modal = document.createElement("div");
  modal.id = "modal";
  modal.className = "modal";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const text = document.createElement("p");
  text.textContent =
    "Соединение с сервером было прервано. Попытка восстановления соединения...";

  modalContent.appendChild(text);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  function showModal() {
    modal.style.display = "block";
  }

  function hideModal() {
    modal.style.display = "none";
  }

  return { showModal, hideModal };
}

export function showModal() {
  const modal = createModal();
  modal.showModal();
}

export function hideModal() {
  const modalElement = document.getElementById("modal");
  if (modalElement) {
    modalElement.style.display = "none";
  } else {
    console.error("Modal element not found");
  }
}
