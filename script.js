
email.addEventListener("blur", function (event) {
  errorEmail.textContent = '';
  email.classList.remove("error");

  if (!email.checkValidity()) {
    email.classList.add("errorEmail");
    email.style.border = '3px solid';
    email.style.borderColor = 'rgba(231, 0, 100)';
    errorEmail.textContent = "Please enter a valid email.";
  }
})


function validate_card(card) {

  let error_messages = [];
  // Validate card number length.
  if (card.toString().length !== 16) {
    error_messages.push('Your card number must be 16 digits in length');
  }
  // Validate card number for numeric characters.
  else if (!card.toString().match(/^[0-9]+$/)) {
    error_messages.push('Your card number must contain only numeric characters.');
  }

  // Check that the sum of the card number is not equal to zero.
  else if (card.toString().split('').map(Number).reduce((a, b) => a + b) == 0) {
    error_messages.push('Please enter a valid card number');
  }

  // Create an array from card number digits.
  let int = card.toString().split('').map(Number);

  for (let i = int.length - 2; i >= 0; i = i - 2) {
    // double every second digit from the right.
    let val = int[i] * 2;

    // Sum digits of numbers greater than nine.
    if (val > 9) {
      val = val % 10 + 1;
    }
    console.log(val);
    // store digit back into int array at ith position.
    int[i] = val;
  }

  // Sum all digits in the modified int array.
  let total = 0;

  for (let i = 0; i < int.length; i++) {
    total += int[i];
  }
  console.log(total);
  if (total % 10 == 0) {
    error_messages.push('Your card number has been accepted!');
  } else if (total % 10 != 0) {
    error_messages.push('Your card has been rejected.');
  }
  
  // errorCard.innerHTML = error_messages.join('. ');
  return error_messages;
}

console.log(validate_card());

document.getElementById("myform").addEventListener("submit", function (event) {

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const card = document.getElementById('credit_card');
  const errorName = document.getElementById('errorName');
  const errorEmail = document.getElementById('errorEmail');
  const errorCard = document.getElementById('errorCard');

  errorName.textContent = "";
  errorEmail.textContent = "";
  errorCard.textContent = "";

  name.classList.remove("error");
  email.classList.remove("error");
  card.classList.remove("error");

  if (!name.checkValidity()) {
    name.classList.add("error");
    errorName.textContent = "Please enter a valid name.";
    event.preventDefault();
  }

  if (!email.checkValidity()) {
    email.classList.add("error");
    errorEmail.textContent = "Please enter a valid email address.";
    event.preventDefault();
  }

  const cardValidationMessages = validate_card(card);
  if (cardValidationMessages.length > 0) {
    card.classList.add("error");
    errorCard.textContent = cardValidationMessages.join(" ");
    event.preventDefault();
  }
  if (!validate_card(card.value)) {
    card.classList.add("error");
    errorCard.textContent = "Please enter a valid credit card number.";
    errorCard.innertext = "Error"
    event.preventDefault();
  }
});




