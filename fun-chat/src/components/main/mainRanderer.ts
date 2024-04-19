import "./main.css";

export default function mainRenderer() {
  const htmlContent = `
    <div class="container">
    <header class="header">
        <span class="header-name">Пользователь:</span>
        <span>Fun Chat</span>
        <div class="buttons">
            <button id="info-button">Info</button>
            <button id="logout-button">Log Out</button>
        </div>
    </header>
    <main class="main">
        <section class="users">
            <input type="text" placeholder="Поиск" class="user-search" id="user-search">
            <ul class="users-list">
            </ul>
        </section>
        <section class="dialogue">
            <div class="dialogue-header">
                <span class="dialogue-name">name</span>
                <span class="dialogue-status">online</span>
            </div>
            <div class="messages-canvas">
                <div class="message m-left">
                    <span class="message-who-sent">you</span>
                    <span class="message-date">19.04.2024 19:05:23</span>
                    <div class="message-text">ssss</div>
                    <span class="message-status">delivered</span>
                </div>
            </div>
            <div class="dialogue-input">
                <input type="text" placeholder="Напишите" class="dialogue-message">
                <button class="button">Send</button>
            </div>
        </section>
    </main>
    <footer class="footer">
        <span>RSSchool</span>
        <a href="https://github.com/aauroraaborealisrs" target="_blank">
            <span>Kate Sharai</span>
        </a>
        <span>2024</span>
    </footer>
</div>
    `;

  const appElement = document.getElementById("main");

  if (appElement) {
    appElement.innerHTML = "";
    appElement.innerHTML = htmlContent;
    const existingUserLogin = sessionStorage.getItem("login");
    const userLabelElement = document.querySelector(".header-name");
    if (userLabelElement) {
      userLabelElement.textContent += ` ${existingUserLogin}`;
    }

    const userSearchElement = document.getElementById("user-search");
    if (userSearchElement) {
      userSearchElement.addEventListener("input", function (e) {
        const target = e.target as HTMLInputElement;
        const listItems = document.querySelectorAll(".user_li");

        listItems.forEach((item) => {
          if (e.target) {
            const searchValue = (
              e.target as HTMLInputElement
            ).value.toLowerCase();
            const itemText = item.textContent?.toLowerCase() || "";
            if (itemText.includes(searchValue)) {
              (item as HTMLElement).style.display = "";
            } else {
              (item as HTMLElement).style.display = "none";
            }
          }
        });
      });
    } else {
      console.error('Element with ID "user-search" not found');
    }
  } else {
    console.error('Element with ID "main" not found');
  }
}
