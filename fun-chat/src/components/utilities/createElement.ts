export default function createElement(
  tagName: string,
  className: string,
  textContent?: string,
  parent?: HTMLElement,
): HTMLElement {
  const element = document.createElement(tagName);
  element.className = className;
  if (textContent) {
    element.textContent = textContent;
  }
  if (parent) {
    parent.appendChild(element);
  }
  return element;
}
