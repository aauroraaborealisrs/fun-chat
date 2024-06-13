export function updateUserListBasedOnSearch(
  userSearchElement: HTMLElement | null,
  userListItems: NodeListOf<Element>,
) {
  if (!userSearchElement) return;

  userSearchElement.addEventListener("input", function (e) {
    const target = e.target as HTMLInputElement;
    const searchValue = target.value.toLowerCase();

    userListItems.forEach((item) => {
      const itemText = item.textContent?.toLowerCase() || "";
      if (itemText.includes(searchValue)) {
        (item as HTMLElement).style.display = "";
      } else {
        (item as HTMLElement).style.display = "none";
      }
    });
  });
}
