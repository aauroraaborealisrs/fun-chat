export default function mainRenderer(){
    const test = document.createElement("span");
    test.textContent = "main page"
    const appElement = document.getElementById('main');
    if (appElement) {
      appElement.innerHTML = '';
      appElement.appendChild(test);
    }
}