import checkInputValidity from "./inputValidation";

function checkInputs(): boolean {
  const inputs: NodeListOf<HTMLInputElement> =
    document.querySelectorAll("#login-form input");
  let allValid = true;

  inputs.forEach((input) => {
    const { isValid, errorMessage } = checkInputValidity(input);

    const errorElement = document.getElementById(
      `${input.id}Error`,
    ) as HTMLElement;
    if (!isValid) {
      errorElement.style.display = "block";
      errorElement.textContent = errorMessage;
      allValid = false;
    } else {
      errorElement.style.display = "none";
    }
  });

  return allValid;
}

export { checkInputs };
