export default function infoPageRenderer(){
    const test = document.createElement("span");
    test.textContent = "hehehehhe"
    const appElement = document.getElementById('info-page');
    if (appElement) {
      appElement.innerHTML = '';
      appElement.appendChild(test);
    }
}