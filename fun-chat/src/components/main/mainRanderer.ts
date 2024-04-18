import './main.css';

export default function mainRenderer() {
    const htmlContent = `
    <div class="container">
    <header class="header">
        <span>Пользователь:</span>
        <span>Fun Chat</span>
        <div class="buttons">
            <button>Info</button>
            <button>Log Out</button>
        </div>
    </header>
    <main class="main">
        <section class="users">
            <input type="text" placeholder="Поиск" class="user-search">
            <ul class="users-list">
                <li>user1</li>
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

    const appElement = document.getElementById('main');

    if (appElement) {
        appElement.innerHTML = '';
        appElement.innerHTML = htmlContent;
    } else {
        console.error('Element with ID "main" not found');
    }
}