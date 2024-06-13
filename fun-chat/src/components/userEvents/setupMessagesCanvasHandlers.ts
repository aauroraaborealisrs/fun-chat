import { markAsRead, markAsReadHistory } from "../message/markAsRead";
import { markToReadFromHistory, responsesArray } from "../ws/socket";

export function setupMessagesCanvasHandlers(canvasElement: Element | null) {
    if (!canvasElement) return;
  
    let isUserScrolling = false;
  
    canvasElement.addEventListener("mousedown", () => {
      isUserScrolling = true;
    });
  
    canvasElement.addEventListener("mouseup", () => {
      isUserScrolling = false;
    });
  
    canvasElement.addEventListener("touchstart", () => {
      isUserScrolling = true;
    });
  
    canvasElement.addEventListener("touchend", () => {
      isUserScrolling = false;
    });
  
    canvasElement.addEventListener("wheel", () => {
      markAsRead(responsesArray);
      markAsReadHistory(markToReadFromHistory);
      isUserScrolling = true;
    });
  
    canvasElement.addEventListener("scroll", () => {
      if (isUserScrolling) {
        markAsRead(responsesArray);
        markAsReadHistory(markToReadFromHistory);
      }
    });
  
    canvasElement.addEventListener("click", () => {
      markAsRead(responsesArray);
      markAsReadHistory(markToReadFromHistory);
    });
  }