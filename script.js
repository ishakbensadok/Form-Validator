/*
A simple form validation
*/

// selections

const form = document.querySelector('.form');
// Get the form inputs
const nameInput = form.elements['name'];
const emailInput = form.elements['email'];
const passwordInput = form.elements['password'];
const confirmPasswordInput = form.elements['confirm-password'];

// hapler functions
const setError = function (input, mesg) {
  input.nextElementSibling.textContent = mesg;
  input.className = 'input error';
};
const setSuccess = function (input) {
  input.className = 'input valid';
  input.nextElementSibling.textContent = '';
};

const resetInput = (input) => {
  input.className = 'input ';
  input.nextElementSibling.textContent = '';
};

const isLengthValid = function (nameInput, min, max) {
  if (nameInput.value.length < min) {
    if (!isImpty(nameInput))
      setError(nameInput, `${nameInput.id} must be at least ${min} characters`);
    return false;
  }

  if (nameInput.value.length > max) {
    setError(nameInput, `${nameInput.id} must be less then ${max} characters`);
    return false;
  }

  return true;
};
const isImpty = (input) => (!input.value ? true : false);
const required = (input) => setError(input, 'This field is required');
const isValidEmail = (input, emailPattern) => emailPattern.test(input.value);

//functions
const userNameValidation = (nameInput) => {
  if (isLengthValid(nameInput, 3, 15)) setSuccess(nameInput);
};

const emailValidation = (nameInput) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //
  isValidEmail(nameInput, emailPattern)
    ? setSuccess(nameInput)
    : !isImpty(nameInput)
    ? setError(nameInput, 'Please enter a valid email address')
    : '';
};

const passwordValidation = function (passwordInput, confPasswordInput) {
  if (isLengthValid(passwordInput, 6, 25)) {
    setSuccess(passwordInput);
    if (confPasswordInput.value === passwordInput.value)
      setSuccess(confPasswordInput);
  }
  if (confPasswordInput.value !== passwordInput.value)
    setError(confPasswordInput, 'Passward do not match');

  if (
    !isLengthValid(passwordInput, 6, 25) &&
    confPasswordInput.value === passwordInput.value &&
    !isImpty(confPasswordInput)
  )
    resetInput(confPasswordInput);
};

const requiredFields = function (...arr) {
  arr.forEach((input) => (isImpty(input) ? required(input) : ''));
};
// event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();
  requiredFields(nameInput, emailInput, passwordInput, confirmPasswordInput);
  userNameValidation(nameInput);
  emailValidation(emailInput);
  passwordValidation(passwordInput, confirmPasswordInput);
});


